<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\TransactionController;

Route::post('/register',[AuthController::class,'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/login', function() {
    return response()->json(['message' => 'API login endpoint ready']);
});
Route::post('/guest-login',[AuthController::class,'guest']);

Route::middleware('auth:sanctum')->group(function(){
    Route::get('/user', function(\Illuminate\Http\Request $r){ return $r->user(); });
    Route::post('/logout',[AuthController::class,'logout']);
    Route::get('/summary',[DashboardController::class,'summary']);
        Route::get('/dashboard', function(Request $request) {
            // Dummy data, bisa diganti dengan query database
            return response()->json([
                'stats' => [
                    [
                        'label' => 'Total Nasabah',
                        'value' => 1247,
                        'change' => '+12% dari bulan lalu',
                        'icon' => null,
                        'color' => 'border-blue-500',
                        'text' => 'text-blue-700',
                        'bg' => 'bg-blue-50',
                    ],
                    [
                        'label' => 'Total Setoran',
                        'value' => 45200000,
                        'change' => '+8.5% dari bulan lalu',
                        'icon' => null,
                        'color' => 'border-green-500',
                        'text' => 'text-green-700',
                        'bg' => 'bg-green-50',
                    ],
                    [
                        'label' => 'Total Penarikan',
                        'value' => 32100000,
                        'change' => '-3.2% dari bulan lalu',
                        'icon' => null,
                        'color' => 'border-red-500',
                        'text' => 'text-red-700',
                        'bg' => 'bg-red-50',
                    ],
                    [
                        'label' => 'Butuh Verifikasi',
                        'value' => 23,
                        'change' => 'data menunggu verifikasi',
                        'icon' => null,
                        'color' => 'border-yellow-500',
                        'text' => 'text-yellow-700',
                        'bg' => 'bg-yellow-50',
                    ],
                ],
                'pieData' => [
                    [ 'name' => 'Organik', 'value' => 59.7, 'color' => '#34d399' ],
                    [ 'name' => 'Anorganik', 'value' => 40.3, 'color' => '#3b82f6' ],
                ],
                'transactions' => [
                    [ 'name' => 'Sari Dewi', 'type' => 'Setoran', 'amount' => 125000, 'status' => 'Proses', 'avatar' => 'https://randomuser.me/api/portraits/women/1.jpg' ],
                    [ 'name' => 'Budi Santoso', 'type' => 'Penarikan', 'amount' => 75000, 'status' => 'Proses', 'avatar' => 'https://randomuser.me/api/portraits/men/2.jpg' ],
                    [ 'name' => 'Maya Putri', 'type' => 'Setoran', 'amount' => 200000, 'status' => 'Selesai', 'avatar' => 'https://randomuser.me/api/portraits/women/3.jpg' ],
                    [ 'name' => 'Agus Rahman', 'type' => 'Setoran', 'amount' => 90000, 'status' => 'Proses', 'avatar' => 'https://randomuser.me/api/portraits/men/4.jpg' ],
                    [ 'name' => 'Lisa Handayani', 'type' => 'Penarikan', 'amount' => 150000, 'status' => 'Selesai', 'avatar' => 'https://randomuser.me/api/portraits/women/5.jpg' ],
                ],
            ]);
        });
    Route::apiResource('transactions', TransactionController::class)->only(['index','store']);
});