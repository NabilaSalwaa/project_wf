<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TransactionController;

Route::post('/register',[AuthController::class,'register']);
Route::post('/login',[AuthController::class,'login']);
Route::post('/guest-login',[AuthController::class,'guest']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function(\Illuminate\Http\Request $r){ return $r->user(); });
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/summary',[DashboardController::class,'summary']);
    Route::apiResource('transactions', TransactionController::class)->only(['index','store']);
});
