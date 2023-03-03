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
Route::get('/users/{userId}', [Users::class, 'getUserId']);
Route::get('users/{userId}/friends', [Users::class, 'getUserFriends']);
Route::patch('/users/{id}/{friendId}', [Users::class, 'addOrRemoveFriend']);


// Posts Routes
Route::get('/posts', [Posts::class, 'getAllPosts']);
Route::post('/posts', [Posts::class, 'makePost']);
Route::post('/posts/{postId}/delete', [Posts::class, 'deletePost']);