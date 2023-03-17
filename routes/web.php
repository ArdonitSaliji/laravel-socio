<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Models\user;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\UsersController;


// Auth Routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);

// User Routes
Route::post('/users/find', [UsersController::class, 'findUsers']);
Route::post('/users/id/messages', [UsersController::class, 'messagesWithFriend']);
Route::post('/users/message/friend', [UsersController::class, 'messageFriend']);
Route::get('/users/{userId}', [UsersController::class, 'getUserProfile']);
Route::get('/users/{userId}/friends', [UsersController::class, 'getUserFriends']);
Route::patch('/users/{id}/{friendId}', [UsersController::class, 'addOrRemoveFriend']);

// Post Routes
Route::get('/posts', [PostsController::class, 'getAllPosts']);
Route::get('/posts/{userId}/posts', [PostsController::class, 'getUserPosts']);
Route::post('/posts', [PostsController::class, 'makePost']);
Route::post('/posts/{postId}/delete', [PostsController::class, 'deletePost']);




// Route::get('/assets/{path}', 'AssetController@serve')->where('path', '(.*)');