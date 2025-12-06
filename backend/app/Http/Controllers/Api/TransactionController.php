<?php
namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index(Request $r)
    {
        return $r->user()->transactions()->latest()->paginate(10);
    }

    public function store(Request $r)
    {
        $data = $r->validate([
            'type'=>'required',
            'category'=>'required',
            'weight'=>'required|numeric',
            'amount'=>'required|numeric',
            'user_id' => 'nullable|exists:users,id'
        ]);
        
        // Jika ada user_id dari request (untuk non-authenticated call)
        if (isset($data['user_id'])) {
            $user = \App\Models\User::findOrFail($data['user_id']);
            unset($data['user_id']); // Hapus dari data transaction
        } else {
            // Jika authenticated, ambil dari auth
            $user = $r->user();
            if (!$user) {
                return response()->json([
                    'success' => false,
                    'message' => 'User not authenticated and no user_id provided'
                ], 401);
            }
        }
        
        // Simpan transaksi
        $tx = $user->transactions()->create($data);
        
        // UPDATE SALDO BERDASARKAN TYPE:
        if ($data['type'] === 'deposit' || $data['type'] === 'setor') {
            // Setoran sampah → Nambah saldo_penarikan (belum masuk rekening)
            $user->saldo_penarikan = ($user->saldo_penarikan ?? 0) + $data['amount'];
        } elseif ($data['type'] === 'withdraw' || $data['type'] === 'tarik') {
            // Penarikan ke bank → Kurangi saldo_penarikan, tambah saldo dashboard
            $user->saldo_penarikan = ($user->saldo_penarikan ?? 0) - $data['amount'];
            $user->saldo = ($user->saldo ?? 0) + $data['amount'];
        }
        
        $user->save();
        
        return response()->json([
            'success' => true,
            'transaction' => $tx,
            'saldo_penarikan' => $user->saldo_penarikan, // Saldo untuk tarik ke bank
            'saldo_dashboard' => $user->saldo, // Saldo yang sudah masuk rekening
            'message' => 'Transaksi berhasil'
        ], 201);
    }
}
