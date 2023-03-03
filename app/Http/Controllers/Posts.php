<?php

namespace App\Http\Controllers;

use App\Models\post;
use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class Posts extends Controller
{
    public function getAllPosts() {
        $allPosts = post::all();
        return response()->json($allPosts, 200);
    }
    public function makePost(Request $request) {
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
    }
    public function deletePost($postId) {
        
        $file = post::where('id', $postId)->first();
        if ($file->picturePath) {
            unlink(public_path('assets/' . $file->picturePath));
        }
        post::where('id', $postId)->delete();
        $allPosts = post::all();
    
        return response()->json($allPosts);
    }
}