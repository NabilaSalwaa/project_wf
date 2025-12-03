<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Response;

class SetoranSampahController extends Controller
{
    public function store(Request $request)
    {
        // Validasi data
        $validator = Validator::make($request->all(), [
            'kategori' => 'required|string',
            'jenis' => 'required|string',
            'berat' => 'required|numeric',
            'catatan' => 'nullable|string',
            'foto' => 'nullable|image|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Simpan foto jika ada
        $fotoUrl = null;
        if ($request->hasFile('foto')) {
            $foto = $request->file('foto');
            $fotoPath = $foto->store('setoran_sampah', 'public');
            $fotoUrl = Storage::url($fotoPath);
        }

        // Simpan data ke database (contoh: hanya return data, implementasi simpan ke DB sesuai kebutuhan)
        $data = [
            'kategori' => $request->input('kategori'),
            'jenis' => $request->input('jenis'),
            'berat' => $request->input('berat'),
            'catatan' => $request->input('catatan'),
            'fotoUrl' => $fotoUrl,
            'status' => 'pending',
            'created_at' => now(),
        ];

        // TODO: Simpan ke database jika sudah ada model
        // Contoh: SetoranSampah::create($data);

        return response()->json($data, 201);
    }
}
