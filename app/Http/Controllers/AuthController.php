<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class AuthController extends Controller{
// login a user methods
    public function formLogin(){
        return Inertia::render('Auth/Login');
    }
    public function login(Request $request) {
        $data = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string|min:6'
        ]);
        //check if the password is correct
        $user= User::withoutTrashed()->where('email', $data['email'])->first();
        if(!$user){
            return to_route('formLogin')->withErrors(['email'=>'The provided email is incorrect.'])
                ->withInput($request->only('email'));
        }
        if (!Hash::check($data['password'], $user->password)) {
                return to_route('formLogin')->withErrors(['password'=>'The provided password is incorrect.'])
                    ->withInput($request->only('email'));
        }


        if(!Auth::attempt(['email' => $request->email, 'password' => $request->password])){
            return $this->sendError('Unauthorised.', ['error'=>'Unauthorised']);
        }
        return to_route('dashboard');
    }
// logout
    public function logout(Request $request) {
        Auth::logout();
        Cookie::queue(Cookie::forget('laravel_session'));
        Cookie::queue(Cookie::forget('XSRF-TOKEN'));
        return to_route('login');
    }
    public function user(Request $request) {
        $user = auth()->user();
        return response()->json($user);
    }

}
