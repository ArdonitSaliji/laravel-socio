<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\user;

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', function (Request $request) {
    $input = $request->all();
    
    $user = user::where('email', $request->email)->first();

    $auth = user::where('password', $request->password)->first();

    if ($user && $auth) {
        return response()->json(['user' => $user, 'token' => 1234]);
    }

    return response()->json('Error 403', 403);    
});

Route::post('/signup', function (Request $request) {
    $req = $request->all();
    return response()->json($req, 200);
});

Route::get('/users/{userId}', function ($userId) {
    
    $findUser = user::where('id', $userId)->first();

    if($findUser) {
        return response()->json($findUser, 200);  
    } else {
        return response()->json('User not found', 404);
    } 
    
});