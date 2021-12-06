<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    
    public function register(Request $request)
    {
        $fields = $request->validate([
            'name'          => 'required|string',
            'email'         => 'required|string|email|unique:users,email',
            'password'      => 'required|string|confirmed',
            'user_type'     => 'required|string|alpha',
            'phone_no'      => 'required|string',
            'address'       => 'required|string'
        ]);

        $user = User::create([
            'name'          => $fields['name'],
            'email'         => $fields['email'],
            'password'      => bcrypt($fields['password']),
            'user_type'     => $fields['user_type'],
            'phone_no'      => $fields['phone_no'],
            'address'       => $fields['address']
        ]);

        $token = $user->createToken('cmudas')->plainTextToken;

        $response = [
            'user'          => $user,
            'token'         => $token
        ];

        return response($response, 201);
    }

    public function login(Request $request)
    {
        $fields = $request->validate([
            'email'         => 'required|string|email',
            'password'      => 'required|string'
        ]);

        $user = User::where('email', $fields['email'])->first();

        if(!$user || !Hash::check($fields['password'], $user->password)){
            return response([
                'message'   => 'Credentials not Found'
            ], 401);
        }

        $token = $user->createToken('cmudas')->plainTextToken;

        $response = [
            'user'          => $user,
            'token'         => $token
        ];

        return response($response, 201);
    }

    public function logout()
    {
        auth()->user()->tokens()->delete();

        return [
            'message'       => 'Logged out'
        ];
    }

}
