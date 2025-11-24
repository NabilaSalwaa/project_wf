<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function summary(Request $r)
    {
        $user = $r->user();
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
