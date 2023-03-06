<?php

namespace App\Http\Controllers;

use App\Models\user;
use App\Models\message;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
class Users extends Controller
{
    public function getUserProfile($userId) {
        $findUser = user::where('id', $userId)->first();
        if($findUser) {
            return response()->json($findUser, 200);  
        } else {
            return response()->json('User not found', 404);
        } 
    }

    public function getUserFriends($userId) {
        $findFriends = user::where('id', $userId)->first();
        $parse = json_decode($findFriends->friends, true);
        $friends = user::whereIn('id', $parse)->get();
        return response()->json($friends);
    }

    public function addOrRemoveFriend($id, $friendId) {
        $user = user::findOrFail($id);
        $friend = user::findOrFail($friendId);
        $userFriends = json_decode($user->friends, true);
        $friendFriends = json_decode($friend->friends, true);
        $friendId = intval($friendId);
        $id = intval($id);
        
        if (in_array($friendId, $userFriends)) {
            $userFriends = array_filter($userFriends, function($value) use ($friendId) {
                return $value !== $friendId;
            });
            if($friendFriends) {
                $friendFriends = array_filter($friendFriends, function($value) use ($id) {
                return $value !== $id;
            });    
            }
        
        } else {
            $userFriends[] = $friendId;
            $friendFriends[] = $id;
        }
        $user->friends = json_encode($userFriends);
        $friend->friends = json_encode($friendFriends);
        $user->save();
        $friend->save();
        $user->friends = json_decode($user->friends, true);
        $userFriends = user::whereIn('id', $user->friends)->get();
        return response()->json($userFriends);
    }

    public function messagesWithFriend(Request $req) {
        $friend = user::where('id', $req->friendId)->first();

        $messages = message::where('userId', $req->userId)->where('friendId', $req->friendId)->first();

        if ($messages) {
            return response()->json(['friend' => $friend, 'messages' => $messages]);
        }

        $post = [
            'userId' => $req->userId,
            'friendId' => $req->friendId,
            'chat' => '[]',
            'created_at' => Carbon::now()->timestamp,
            'updated_at' => Carbon::now()->timestamp
        ];
        
        $newMessage = new message;
        $newMessage->fill($post);
        $newMessage->save();
        
        return response()->json(['friend' => $friend, 'messages' => $newMessage]);
    }

    public function messageFriend(Request $req) {
        $userId = $req->userId;
        $friendId = $req->friendId;
        $input = $req->input;
        
        $chat = message::where('userId', $userId)->where('friendId', $friendId)->first();
        $chat->chat = json_decode($chat->chat, true);
        $chatMessages = $chat->chat;
         
        array_push($chatMessages, ['userId' => $userId, 'message' => $input]);
        $chat->chat = $chatMessages;
        $chat->save();
        

        return response()->json($chat->chat);
    }
}