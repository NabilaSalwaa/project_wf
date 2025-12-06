<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TransactionController;
use App\Http\Controllers\UserController;

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/guest-login',[AuthController::class,'guest']);

// Public routes (no authentication needed for testing)
Route::get('/user', function(\Illuminate\Http\Request $r){ 
    // Return dummy user for testing
    return response()->json([
        'id' => 8,
        'name' => 'Ahmad Rizki',
        'email' => 'ahmadrizki@gmail.com',
        'role' => 'nasabah'
    ]);
});
Route::post('/logout',[AuthController::class,'logout']);
Route::get('/summary',[DashboardController::class,'summary']);

// Admin routes for user management
Route::get('/users/recent', [UserController::class, 'getRecentUsers']);
Route::get('/users/all', [UserController::class, 'getAllUsers']);
Route::get('/users/stats', [UserController::class, 'getUserStats']);

// Saldo management (public untuk nasabah bisa update)
Route::post('/users/{userId}/update-saldo', [UserController::class, 'updateSaldo']);
Route::post('/users/{userId}/set-saldo', [UserController::class, 'setSaldo']);

// Transactions (sementara public untuk testing)
Route::post('/transactions', [TransactionController::class, 'store']);
Route::get('/transactions', [TransactionController::class, 'index']);
