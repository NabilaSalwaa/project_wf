<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Check if user exists
$existingUser = User::where('email', 'test@bangkit.com')->first();

if ($existingUser) {
    echo "User test@bangkit.com already exists!\n";
    echo "ID: " . $existingUser->id . "\n";
    echo "Name: " . $existingUser->name . "\n";
} else {
    // Create new user
    $user = new User();
    $user->name = 'Test User';
    $user->email = 'test@bangkit.com';
    $user->password = Hash::make('password123');
    $user->save();
    
    echo "User created successfully!\n";
    echo "Email: test@bangkit.com\n";
    echo "Password: password123\n";
}
