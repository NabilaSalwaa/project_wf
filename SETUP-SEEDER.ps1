# BANGKIT - Setup Database Seeder
# Jalankan migrasi dan seeder untuk membuat database & users

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║                                        ║" -ForegroundColor Green
Write-Host "║   BANGKIT - SETUP DATABASE SEEDER     ║" -ForegroundColor Green
Write-Host "║   Buat User dari Database Seeder      ║" -ForegroundColor Green
Write-Host "║                                        ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""

$backendPath = Join-Path $PSScriptRoot "backend"
Set-Location $backendPath

Write-Host "[1/3] Jalankan migrasi database..." -ForegroundColor Cyan
$result = & php artisan migrate:fresh 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ ERROR: Migrasi gagal!" -ForegroundColor Red
    Write-Host "   Pastikan MySQL sudah running di XAMPP" -ForegroundColor Yellow
    Write-Host ""
    Write-Host $result -ForegroundColor Red
    Read-Host "Tekan Enter untuk keluar"
    exit 1
}

Write-Host ""
Write-Host "[2/3] Jalankan database seeder..." -ForegroundColor Cyan
$result = & php artisan db:seed --class=DatabaseSeeder 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host ""
    Write-Host "❌ ERROR: Seeder gagal!" -ForegroundColor Red
    Write-Host ""
    Write-Host $result -ForegroundColor Red
    Read-Host "Tekan Enter untuk keluar"
    exit 1
}

Write-Host ""
Write-Host "[3/3] Verifikasi user yang dibuat..." -ForegroundColor Cyan
& php artisan tinker --execute="echo ''; echo 'Total users: ' . \App\Models\User::count(); echo ''; \App\Models\User::all(['email', 'role'])->each(function(`$u) { echo '  - ' . `$u->email . ' (' . `$u->role . ')'; echo ''; });"

Write-Host ""
Write-Host "╔════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║        ✓ SETUP BERHASIL! ✓            ║" -ForegroundColor Green
Write-Host "╚════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "📋 USER YANG DIBUAT:" -ForegroundColor White
Write-Host "   1. ahmadrizki@gmail.com (nasabah)" -ForegroundColor Cyan
Write-Host "      Password: password" -ForegroundColor Gray
Write-Host ""
Write-Host "   2. admin@bangkit.com (admin)" -ForegroundColor Cyan
Write-Host "      Password: admin123" -ForegroundColor Gray
Write-Host ""
Write-Host "🚀 READY TO LOGIN!" -ForegroundColor Yellow
Write-Host "   Jalankan: START-FIXED.bat" -ForegroundColor White
Write-Host ""
Read-Host "Tekan Enter untuk keluar"
