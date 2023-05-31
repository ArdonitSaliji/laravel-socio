<?php

namespace App\Http\Controllers;

use App\Models\Post;
use App\Models\User;
use App\Models\Like;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class PostsController extends Controller
{
    public function getAllPosts($userId) {
        $user = User::find($userId);
        $posts = Post::with(['likes' => function ($query) use ($userId) {
            $query->where('user_id', $userId);
        }])->withCount('likes')->get();

        $posts = $posts->map(function ($post) {
            $post->likedByCurrentUser = $post->likes->isNotEmpty();
            return $post;
        });

        return response()->json($posts, 200);
    }


    public function getUserPosts(Request $req) {
        $userPosts = Post::where('userId', $req->userId)->get();
        return response()->json($userPosts);
    }

    public function makePost(Request $request) {
        $user = User::where('userId', $request->userId)->first();
        $post = [
            'userId' => $request->userId,
            'firstName' => $user->firstName,
            'lastName' =>  $user->lastName,
            'location' => $user ->location,
            'description' => $request->description,
            'picturePath' => '',
            'userPicturePath' => $user->picturePath,
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
        $allPosts = Post::all();
        return response()->json($allPosts);
    }
    
    public function likePost(Request $req) {

        $like = ['user_id' => $req->userId, 'post_id' => $req->postId];
        $postIsAlreadyLiked = Like::where('user_id', $req->userId)->where('post_id', $req->postId)->first();
        $post = Post::where('postId', $req->postId)->get();

        if($postIsAlreadyLiked) {
            $postIsAlreadyLiked->delete();
            $post[0]['likedByCurrentUser'] = false;
            $post = Post::withCount('likes')->find($req->postId);

            return response()->json($post, 202);
        } else {
            $newLike = new Like;

            $newLike->fill($like);
            $newLike->save();

            $post = Post::withCount('likes')->find($req->postId);
            $post->likedByCurrentUser = $postIsAlreadyLiked ? false : true;
            
            return response()->json($post, 201);
        }

    }

    public function deletePost($postId) {
        
        $file = Post::where('postId', $postId)->first();
        if ($file->picturePath) {
            unlink(public_path('assets/' . $file->picturePath));
        }

        Post::where('postId', $postId)->delete();
        $allPosts = Post::all();
    
        return response()->json($allPosts);
    }
}