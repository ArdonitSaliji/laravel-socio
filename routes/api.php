<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\user;
use App\Models\post;
use Illuminate\Support\Carbon;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', function (Request $request) {
    $input = $request->all();
    
    $auth = user::where('email', $request->email)->where('password', $request->password)->first();

    

    if ($auth) {
        return response()->json(['user' => $auth, 'token' => 1234, 'status' => 200]);
    }

    return response()->json(['message' => 'Error 403', 'status' => 403], 403);
});

Route::post('/signup', function (Request $request) {
    $all = $request->all();
    $email = $request->email;
    
    $userExists = user::where('email', $request->email)->first();

    if ($userExists) {
        return response()->json(['message' =>'Email already exists!', 'status' => 409], 409);
    }

    $user = [
        'email' => $request->email,
        'password' => $request->password,
        'firstName' => $request->firstName,
        'lastName' =>  $request->lastName,
        'occupation' => $request->occupation,
        'location' => $request->location,
        'picturePath' => $request->picturePath,
        'created_at' => Carbon::now()->timestamp,
        'updated_at' =>  Carbon::now()->timestamp,
    ];
        
    $newUser = new user;
    $newUser->fill($user);
    $newUser->save(); 
    
    return response()->json(['message' => $newUser, 'status' => 201], 201);;
});

Route::get('/users/{userId}', function ($userId) {
    $findUser = user::where('id', $userId)->first();

    if($findUser) {
        return response()->json($findUser, 200);  
    } else {
        return response()->json('User not found', 404);
    } 
});

Route::get('users/{userId}/friends', function ($userId) {
    $findFriends = user::where('id', $userId)->first();

    
    $parse = json_decode($findFriends->friends, true);

    $friends = user::whereIn('id', $parse)->get();

    return response()->json($friends);
});

Route::get('/posts', function () {
    $allPosts = post::all();
    return response()->json($allPosts, 200);
});

Route::post('/posts', function (Request $request) {
    $user = user::where('id', $request->userId)->first();
    
    $post = [
        'userId' => $request->userId,
        'firstName' => $user->firstName,
        'lastName' =>  $user->lastName,
        'location' => $user ->location,
        'description' => $request->description,
        'picturePath' => '',
        'userPicturePath' => $user->picturePath,
        'likes' => '[]',
        'comments' => '[]',
        'created_at' => Carbon::now()->timestamp,
        'updated_at' =>  Carbon::now()->timestamp,
    ];
    
    $newPost = new post;

    if($request->picture) {
        $request->validate([
            'picture' => 'required|image|mimes:png,jpg,jpeg,webp|max:5048'
        ]);
        
        $imageName = time().'.'.$request->picture->extension();
        $request->picture->move(public_path('assets'), $imageName);
        $post['picturePath'] = $imageName;
        
    } else {
        $post['picturePath'] = '';
    };

        $newPost->fill($post);
        $newPost->save();
        $allPosts = post::all();
        return response()->json($allPosts);

});

Route::post('/posts/{postId}/delete', function ($postId) {    
    $file = post::where('id', $postId)->first();
    if ($file->picturePath) {
        unlink(public_path('assets/' . $file->picturePath));
    }
    
    post::where('id', $postId)->delete();

    $allPosts = post::all();

    return response()->json($allPosts);
});

Route::patch('/users/{id}/{friendId}', function ($id, $friendId) {

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

});