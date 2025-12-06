<?php

require __DIR__.'/vendor/autoload.php';

$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use App\Models\User;

echo "\n🧪 TEST PENARIKAN SALDO\n";
echo str_repeat('=', 60) . "\n\n";

// Cari Ahmad Rizki
$ahmad = User::where('email', 'ahmadrizki@gmail.com')->first();

if (!$ahmad) {
    echo "❌ User Ahmad Rizki tidak ditemukan!\n";
    exit(1);
}

echo "📋 DATA SEBELUM PENARIKAN:\n";
echo "   Nama  : {$ahmad->name}\n";
echo "   Email : {$ahmad->email}\n";
echo "   ID    : {$ahmad->id}\n";
echo "   Saldo : Rp " . number_format($ahmad->saldo, 0, ',', '.') . "\n\n";

// Simulasi penarikan Rp 200.000
$jumlahPenarikan = 200000;
echo "💸 Melakukan penarikan Rp " . number_format($jumlahPenarikan, 0, ',', '.') . "...\n\n";

$saldoLama = $ahmad->saldo;
$ahmad->saldo = $saldoLama - $jumlahPenarikan;
$ahmad->save();

echo "✅ PENARIKAN BERHASIL!\n\n";
echo "📊 DATA SETELAH PENARIKAN:\n";
echo "   Nama       : {$ahmad->name}\n";
echo "   Email      : {$ahmad->email}\n";
echo "   ID         : {$ahmad->id}\n";
echo "   Saldo Lama : Rp " . number_format($saldoLama, 0, ',', '.') . "\n";
echo "   Saldo Baru : Rp " . number_format($ahmad->saldo, 0, ',', '.') . "\n";
echo "   Ditarik    : Rp " . number_format($jumlahPenarikan, 0, ',', '.') . "\n\n";

echo str_repeat('=', 60) . "\n";
echo "🎯 Sekarang cek Data Nasabah di halaman admin!\n";
echo "   Saldo Ahmad Rizki harus Rp " . number_format($ahmad->saldo, 0, ',', '.') . "\n";
echo str_repeat('=', 60) . "\n\n";
