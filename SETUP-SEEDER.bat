@echo off
chcp 65001 >nul
color 0A
cls

echo.
echo ╔════════════════════════════════════════╗
echo ║                                        ║
echo ║   BANGKIT - SETUP DATABASE SEEDER     ║
echo ║   Buat User dari Database Seeder      ║
echo ║                                        ║
echo ╚════════════════════════════════════════╝
echo.

cd /d "%~dp0backend"

echo [1/3] Jalankan migrasi database...
php artisan migrate:fresh
if errorlevel 1 (
    echo.
    echo ❌ ERROR: Migrasi gagal!
    echo    Pastikan MySQL sudah running di XAMPP
    echo.
    pause
    exit /b 1
)

echo.
echo [2/3] Jalankan database seeder...
php artisan db:seed --class=DatabaseSeeder
if errorlevel 1 (
    echo.
    echo ❌ ERROR: Seeder gagal!
    echo.
    pause
    exit /b 1
)

echo.
echo [3/3] Verifikasi user yang dibuat...
php artisan tinker --execute="echo ''; echo 'Total users: ' . \App\Models\User::count(); echo ''; \App\Models\User::all(['email', 'role'])->each(function(\$u) { echo '  - ' . \$u->email . ' (' . \$u->role . ')'; echo ''; });"

echo.
echo ╔════════════════════════════════════════╗
echo ║        ✓ SETUP BERHASIL! ✓            ║
echo ╚════════════════════════════════════════╝
echo.
echo 📋 USER YANG DIBUAT:
echo    1. ahmadrizki@gmail.com (nasabah)
echo       Password: password
echo.
echo    2. admin@bangkit.com (admin)
echo       Password: admin123
echo.
echo 🚀 READY TO LOGIN!
echo    Jalankan: START-FIXED.bat
echo.
pause
