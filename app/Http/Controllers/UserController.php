<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(){
        $user = auth()->user();
        $users = User::whereNot("id" , $user->id)->get();
        $users = $this->refactorManyElements($users,'users');
        return Inertia::render('Settings/Users',compact('users'));
    }
    public function store(Request $request) {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            "centre_id"=>'required|exists:centres,id',
            "isSuperAdmin"=>'in:true,false|default:false'
        ]);
        $data['password'] = Hash::make($data['password']);
        $user = User::create($data);
        return to_route('users.index');
    }
    public function update(Request $request,$id) {
        $user = User::find($id);
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            "centre_id"=>'required|exists:centres,id',
            "isSuperAdmin"=>'required|in:true,false|default:false'
        ]);
        $data['password'] = Hash::make($data['password']);
        $user = User::update($data);
        return response()->json(['message'=>'User updated successfully']);
    }
    public function delete($id) {
        $user = User::find($id);
        $user->delete();
        return response()->json(['message'=>'User deleted successfully']);
    }
}
