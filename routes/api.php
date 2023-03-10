<?php

use App\Http\Controllers\Auth;
use App\Http\Controllers\Posts;
use App\Http\Controllers\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Auth Routes
Route::post('/login', [Auth::class, 'login']);
Route::post('/signup', [Auth::class, 'signup']);


// User Routes
Route::post('/users/find', [Users::class, 'findUsers']);
Route::post('/users/id/messages', [Users::class, 'messagesWithFriend']);
Route::post('/users/message/friend', [Users::class, 'messageFriend']);
Route::get('/users/{userId}', [Users::class, 'getUserProfile']);
Route::get('/users/{userId}/friends', [Users::class, 'getUserFriends']);
Route::patch('/users/{id}/{friendId}', [Users::class, 'addOrRemoveFriend']);


// Post Routes
Route::get('/posts', [Posts::class, 'getAllPosts']);
Route::get('/posts/{userId}/posts', [Posts::class, 'getUserPosts']);
Route::post('/posts', [Posts::class, 'makePost']);
Route::post('/posts/{postId}/delete', [Posts::class, 'deletePost']);