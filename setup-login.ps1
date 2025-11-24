# INSTRUKSI MUDAH - Jalankan Login BANGKIT

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " BANGKIT - Setup Login" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1
Write-Host "[LANGKAH 1] Pastikan MySQL di XAMPP sudah running" -ForegroundColor Yellow
Write-Host "  -> Buka XAMPP Control Panel" -ForegroundColor Gray
Write-Host "  -> Klik START pada MySQL" -ForegroundColor Gray
Write-Host ""
$null = Read-Host "Tekan ENTER setelah MySQL running"

# Step 2  
Write-Host ""
Write-Host "[LANGKAH 2] Membuat database..." -ForegroundColor Yellow
& "C:\XAMPP_NEW\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS bangkit;"
if ($LASTEXITCODE -eq 0) {
    Write-Host "  V Database 'bangkit' berhasil dibuat!" -ForegroundColor Green
} else {
    Write-Host "  X Error: MySQL belum running!" -ForegroundColor Red
    Write-Host "  Silakan start MySQL di XAMPP dulu, lalu jalankan script ini lagi." -ForegroundColor Yellow
    exit 1
}

# Step 3
Write-Host ""
Write-Host "[LANGKAH 3] Menjalankan migration..." -ForegroundColor Yellow
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan migrate --force
Write-Host "  V Migration selesai!" -ForegroundColor Green

# Step 4
Write-Host ""
Write-Host "[LANGKAH 4] Membuat user test..." -ForegroundColor Yellow
$createUser = "App\Models\User::firstOrCreate(['email'=>'test@bangkit.com'],['name'=>'Test User','password'=>Hash::make('password123')]); echo 'User created';"
php artisan tinker --execute=$createUser

# Step 5
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host " Setup Selesai!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Sekarang jalankan 2 server:" -ForegroundColor White
Write-Host ""
Write-Host "Backend Server:" -ForegroundColor Yellow
Write-Host "  cd 'c:\XAMPP_NEW\htdocs\web framework\backend'" -ForegroundColor Cyan
Write-Host "  php artisan serve --port=8080" -ForegroundColor Cyan
Write-Host ""
Write-Host "Frontend Server (SUDAH RUNNING):" -ForegroundColor Yellow  
Write-Host "  http://localhost:5173" -ForegroundColor Green
Write-Host ""
Write-Host "Login dengan:" -ForegroundColor White
Write-Host "  Email: test@bangkit.com" -ForegroundColor Yellow
Write-Host "  Password: password123" -ForegroundColor Yellow
Write-Host ""
