<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $r)
    {
        $data = $r->validate([
            'name'=>'required|string',
            'email'=>'required|email|unique:users',
            'password'=>'required|min:6',
            'phone'=>'nullable|string'
        ]);

        $user = User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
            'phone'=>$data['phone'] ?? null
        ]);

        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json(['user'=>$user,'token'=>$token]);
    }

    public function login(Request $r)
    {
        $creds = $r->validate(['email'=>'required|email','password'=>'required']);
        $user = User::where('email',$creds['email'])->first();
        if(!$user || !Hash::check($creds['password'],$user->password)){
            return response()->json(['message'=>'Invalid credentials'],401);
        }
        $token = $user->createToken('api-token')->plainTextToken;
        return response()->json(['user'=>$user,'token'=>$token]);
    }

    // Guest login for development/demo purposes. Returns a token for a demo user.
    public function guest(Request $r)
    {
        $email = config('app.guest_email', 'guest@example.com');

        $user = User::firstOrCreate(
            ['email' => $email],
            [
                'name' => 'Guest User',
                'password' => Hash::make(Str::random(16)),
                'role' => 'guest',
                'is_demo' => true,
                'metadata' => ['created_by' => 'guest_login']
            ]
        );

        $token = $user->createToken('guest-token')->plainTextToken;
        return response()->json(['user' => $user, 'token' => $token]);
    }

    public function logout(Request $r)
    {
        $r->user()->currentAccessToken()->delete();
        return response()->json(['message'=>'Logged out']);
    }
}
