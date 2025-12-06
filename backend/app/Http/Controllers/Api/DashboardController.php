<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;

class DashboardController extends Controller
{
    public function summary(Request $r)
    {
        // Ambil email dari query parameter atau request body
        $email = $r->input('email') ?? $r->query('email');
        
        if (!$email) {
            return response()->json([
                'success' => false,
                'message' => 'Email tidak ditemukan'
            ], 400);
        }

        // Cari user berdasarkan email
        $user = User::where('email', $email)->first();
        
        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'User tidak ditemukan'
            ], 404);
        }

        $totalAmount = $user->transactions()->sum('amount');
        $totalWeight = $user->transactions()->sum('weight');
        $byCategory = $user->transactions()
            ->selectRaw('category, sum(weight) as total_weight, sum(amount) as total_amount')
            ->groupBy('category')->get();

        $latest = $user->transactions()->latest()->limit(6)->get();

        return response()->json([
            'totalAmount'=>$totalAmount,
            'totalWeight'=>$totalWeight,
            'byCategory'=>$byCategory,
            'latest'=>$latest
        ]);
    }
}
