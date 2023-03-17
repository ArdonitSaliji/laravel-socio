<?php

namespace App\Http\Controllers;

use App\Models\user;
use App\Models\message;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
class UsersController extends Controller
{

    public function findUsers(Request $request) {
        try {
            if ($request->input('search')) {
                $nameParts = explode(' ', $request->input('search'));
                $firstName = $nameParts[0];
                $lastName = isset($nameParts[1]) ? $nameParts[1] : null;
        
                $query = user::query();
                if (count($nameParts) == 1) {
                    $query->where('firstName', 'like', $firstName . '%');
                } else if (count($nameParts) == 2) {
                    $query->where('firstName', 'like', $firstName . '%')
                        ->where('lastName', 'like', $lastName . '%');
                }
        
                $users = $query->get();
                return response()->json($users);
            }
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 404);
        }
    }
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

        $userMessages = message::where('userId', $req->userId)->where('friendId', $req->friendId)->first();
        $friendMessages = message::where('userId', $req->friendId)->where('friendId', $req->userId)->first();

        if ($userMessages) {
            return response()->json(['friend' => $friend, 'messages' => $userMessages]);
        }
        if($friendMessages) {
            return response()->json(['friend' => $friend, 'messages' => $friendMessages]);
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
        $input = $req->message;
        
        $chat = message::where('userId', $userId)->where('friendId', $friendId)->first();
        $friendChat = message::where('userId', $friendId)->where('friendId', $userId)->first();

        if ($chat) {
            $chat->chat = json_decode($chat->chat, true);
            $chatMessages = $chat->chat;
            array_push($chatMessages, ['userId' => $userId, 'message' => $input]);
            $chat->chat = $chatMessages;
            $chat->save();
            return response()->json($chat->chat);
            
        } else {
            $friendChat->chat = json_decode($friendChat->chat, true);
            $friendChatMessages =  $friendChat->chat;
            array_push($friendChatMessages, ['userId' => $userId, 'message' => $input]);
            $friendChat->chat = $friendChatMessages;
            $friendChat->save();
            return response()->json($friendChat->chat);

        }
    }
}