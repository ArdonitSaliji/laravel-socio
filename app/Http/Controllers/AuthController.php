<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use League\MimeTypeDetection\OverridingExtensionToMimeTypeMap;

class AuthController extends Controller
{
    public function login() {
        $auth = User::where('email', request('email'))->where('password', request('password'))->first();
        if ($auth) {
            return response()->json(['user' => $auth, 'token' => 1234], 200);
        } 
        
        return response()->json(['message' => 'Unauthorized'], 401);
    }

    public function signup() {
        $userExists = User::where('email', request('email'))->first();
        
        if ($userExists) {
            return response()->json(['message' =>'Email already exists!'], 409);
        }
        
        $user = [
            'email' => request('email'),
            'password' => request('password'),
            'firstName' => request('firstName'),
            'lastName' =>  request('lastName'),
            'occupation' => request('occupation'),
            'location' => request('location'),
            'picturePath' => request('picturePath'),
            'created_at' => Carbon::now()->timestamp,
            'updated_at' =>  Carbon::now()->timestamp,
        ];
            
        $newUser = new user;
        $newUser->fill($user);
        $newUser->save(); 
        
        return response()->json(['message' => $newUser], 201);;
    }

    
}