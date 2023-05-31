<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Message;
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
        
                $query = User::query();
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
        $findUser = User::where('userId', $userId)->first();
        if($findUser) {
            return response()->json($findUser, 200);  
        } else {
            return response()->json('User not found', 404);
        } 
    }

    public function getUserFriends($userId) {
        $user = User::where('userId', $userId)->first();

        $parse = json_decode($user->friends, true);
                
        $userFriends = User::whereIn('userId', $parse)->get();
        return response()->json($userFriends);
    }

    public function addOrRemoveFriend($userId, $friendId) {
        $user = User::where('userId', $userId)->first();
        $friend = User::where('userId', $friendId)->first();
        
        $userFriends = json_decode($user->friends, true);
        $friendFriends = json_decode($friend->friends, true);
        $friendId = intval($friendId);
        $userId = intval($userId);
        
        
        if (in_array($friendId, $userFriends)) {
            $userFriends = array_filter($userFriends, function($value) use ($friendId) {
                return $value !== $friendId;
            });
            if($friendFriends) {
                $friendFriends = array_filter($friendFriends, function($value) use ($userId) {
                return $value !== $userId;
            });    
            }
        
        } else {
            $userFriends[] = $friendId;
            $friendFriends[] = $userId;
        }
        
        $user->friends = json_encode($userFriends);
        $friend->friends = json_encode($friendFriends);
        $user->save();
        $friend->save();
        $user->friends = json_decode($user->friends, true);
        $userFriends = User::whereIn('userId', $user->friends)->get();
        return response()->json($userFriends);
    }

    public function messagesWithFriend(Request $req) {
        $friend = User::where('userId', $req->friendId)->first();

        $userMessages = Message::where('userId', $req->userId)->where('friendId', $req->friendId)->first();
        $friendMessages = Message::where('userId', $req->friendId)->where('friendId', $req->userId)->first();

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
        
        $chat = Message::where('userId', $userId)->where('friendId', $friendId)->first();
        $friendChat = Message::where('userId', $friendId)->where('friendId', $userId)->first();

        if ($chat) {
            $chat->chat = json_decode($chat->chat, true);
            $chatMessages = $chat->chat;
            array_push($chatMessages, ['userId' => $userId, 'message' => $input]);
            $chat->chat = $chatMessages;
            $chat->save();
            return response()->json($chat->chat);
            
        } else if ($friendChat) {
            
            $friendChat->chat = json_decode($friendChat->chat, true);
            $friendChatMessages = $friendChat->chat;
            array_push($friendChatMessages, ['userId' => $userId, 'message' => $input]);
            $friendChat->chat = $friendChatMessages;
            $friendChat->save();
            return response()->json($friendChat->chat);

        } else {
            return abort(400);
        }
    }
}