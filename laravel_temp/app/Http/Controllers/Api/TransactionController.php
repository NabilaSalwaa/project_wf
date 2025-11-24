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
            'amount'=>'required|numeric'
        ]);
        $tx = $r->user()->transactions()->create($data);
        return response()->json($tx,201);
    }
}
