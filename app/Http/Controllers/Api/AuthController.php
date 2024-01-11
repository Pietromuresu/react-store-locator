<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
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
        $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));

    }

    public function logout(){
        /** @var User $user */
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response('', 204);
    }
}
