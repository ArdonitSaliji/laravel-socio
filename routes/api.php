<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Models\user;



/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', function (Request $request) {
    $input = $request->all();
    
    $user = user::where('email', $request->email)->first();

    $auth = user::where('password', $request->password)->first();

    if ($user && $auth) {
        // User is authenticated, redirect to the dashboard
        return response()->json(['user' => $user, 'token' => 1234]);
    }

    return response()->json('Error 403', 403);    
});

Route::get('/users/{userId}', function ($userId) {
    
    $findUser = user::where('id', $userId)->first();

    if($findUser) {
        return response()->json($findUser, 200);  
    } else {
        return response()->json('User not found', 404);
    } 
});