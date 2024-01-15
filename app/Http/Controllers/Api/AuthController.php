<?php

namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use App\Models\User;

class AuthController extends Controller
{


    public function signup(SignUpRequest $request){

        $data = $request->validated();
        $user = User::create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => bcrypt($data['password']),
            ]);
        /** @var User $user */
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }


    public function login(LoginRequest $request){

        $credentials = $request->validated();
        if(!Auth::attempt($credentials)){
            return response([
                'message' => 'Provided email address or password is incorrect'
            ]);
        }


        /** @var User $user */
        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));

    }

    public function logout(Request $request){
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        $response = [
            "status" => 204,
            "message" => "Logged Out successfully"
        ];
        return response(compact('response'));
    }
}
