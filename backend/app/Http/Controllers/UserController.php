<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Get recent users registered after a specific timestamp
     */
    public function getRecentUsers(Request $request)
    {
        try {
            $since = $request->query('since', time() * 1000);
            $sinceDate = date('Y-m-d H:i:s', $since / 1000);

            $newUsers = User::where('created_at', '>', $sinceDate)
                ->orderBy('created_at', 'desc')
                ->get()
                ->map(function($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone ?? null,
                        'saldo' => floatval($user->saldo ?? 0),
                        'saldo_penarikan' => floatval($user->saldo_penarikan ?? 0),
                        'address' => $user->address ?? null,
                        'gender' => $user->gender ?? null,
                        'birth_date' => $user->birth_date ?? null,
                        'occupation' => $user->occupation ?? null,
                        'role' => $user->role ?? 'user',
                        'created_at' => $user->created_at->toIso8601String(),
                        'profile_photo' => $user->profile_photo ?? null
                    ];
                });

            return response()->json([
                'success' => true,
                'newUsers' => $newUsers,
                'count' => $newUsers->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching recent users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get all users (for admin)
     */
    public function getAllUsers(Request $request)
    {
        try {
            $users = User::orderBy('created_at', 'desc')
                ->get()
                ->map(function($user) {
                    return [
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'phone' => $user->phone ?? null,
                        'saldo' => floatval($user->saldo ?? 0),
                        'saldo_penarikan' => floatval($user->saldo_penarikan ?? 0),
                        'address' => $user->address ?? null,
                        'gender' => $user->gender ?? null,
                        'birth_date' => $user->birth_date ?? null,
                        'occupation' => $user->occupation ?? null,
                        'role' => $user->role ?? 'user',
                        'created_at' => $user->created_at->toIso8601String(),
                        'profile_photo' => $user->profile_photo ?? null
                    ];
                });

            return response()->json([
                'success' => true,
                'users' => $users,
                'total' => $users->count()
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching users',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get user statistics
     */
    public function getUserStats()
    {
        try {
            $totalUsers = User::count();
            $todayUsers = User::whereDate('created_at', today())
                ->count();
            $weekUsers = User::where('created_at', '>=', now()->subDays(7))
                ->count();
            $monthUsers = User::where('created_at', '>=', now()->subDays(30))
                ->count();

            return response()->json([
                'success' => true,
                'stats' => [
                    'total' => $totalUsers,
                    'today' => $todayUsers,
                    'week' => $weekUsers,
                    'month' => $monthUsers
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error fetching user stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update user saldo (untuk transaksi penarikan/penyetoran)
     */
    public function updateSaldo(Request $request, $userId)
    {
        try {
            $data = $request->validate([
                'amount' => 'required|numeric',
                'type' => 'required|in:tambah,kurang',
                'keterangan' => 'nullable|string'
            ]);

            $user = User::findOrFail($userId);

            if ($data['type'] === 'tambah') {
                // Tambah saldo dashboard (untuk admin)
                $user->saldo = ($user->saldo ?? 0) + $data['amount'];
            } else {
                // Penarikan ke bank: Kurangi saldo_penarikan, tambah saldo dashboard
                $currentSaldoPenarikan = $user->saldo_penarikan ?? 0;
                
                if ($currentSaldoPenarikan < $data['amount']) {
                    return response()->json([
                        'success' => false,
                        'message' => 'Saldo penarikan tidak mencukupi'
                    ], 400);
                }
                
                // Kurangi dari saldo_penarikan
                $user->saldo_penarikan = $currentSaldoPenarikan - $data['amount'];
                
                // Tambah ke saldo dashboard (uang masuk rekening)
                $user->saldo = ($user->saldo ?? 0) + $data['amount'];
                
                // Simpan transaksi withdraw
                $user->transactions()->create([
                    'type' => 'withdraw',
                    'category' => 'Penarikan ke Bank',
                    'weight' => 0,
                    'amount' => $data['amount'],
                    'notes' => $data['keterangan'] ?? 'Penarikan saldo'
                ]);
            }

            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Penarikan berhasil! Saldo telah ditransfer ke rekening Anda.',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'saldo' => $user->saldo,
                    'saldo_penarikan' => $user->saldo_penarikan
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error updating saldo',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Set saldo directly (for admin)
     */
    public function setSaldo(Request $request, $userId)
    {
        try {
            $data = $request->validate([
                'saldo' => 'required|numeric|min:0'
            ]);

            $user = User::findOrFail($userId);
            $user->saldo = $data['saldo'];
            $user->save();

            return response()->json([
                'success' => true,
                'message' => 'Saldo berhasil diupdate',
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'saldo' => $user->saldo
                ]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error setting saldo',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
