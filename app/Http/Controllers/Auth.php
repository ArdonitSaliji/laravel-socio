<?php

namespace App\Http\Controllers;

use App\Models\user;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class Auth extends Controller
{
    public function login(Request $request) {
        $input = $request->all();
        $auth = user::where('email', $request->email)->where('password', $request->password)->first();
        if ($auth) {
            return response()->json(['user' => $auth, 'token' => 1234, 'status' => 200]);
        }
        return response()->json(['message' => 'Error 403', 'status' => 403], 403);
    }

    public function signup(Request $request) {
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
    }
}