@echo off
color 0A
echo.
echo ========================================
echo   BANGKIT - Auto Start Login Fix
echo ========================================
echo.
echo PASTIKAN MySQL sudah HIJAU di XAMPP!
echo Jika belum, tekan Ctrl+C dan start dulu.
echo.
pause
echo.

REM Check MySQL
echo [1/6] Cek MySQL...
"C:\XAMPP_NEW\mysql\bin\mysql.exe" -u root -e "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo.
    echo ============================================
    echo   [ERROR] MySQL TIDAK RUNNING!
    echo ============================================
    echo.
    echo SOLUSI:
    echo 1. Buka: C:\XAMPP_NEW\xampp-control.exe
    echo 2. Cari baris 'MySQL'
    echo 3. Klik tombol 'Start'
    echo 4. Tunggu sampai HIJAU (tombol berubah jadi 'Stop')
    echo 5. Jalankan script ini lagi
    echo.
    echo Tekan Y untuk buka XAMPP Control Panel...
    pause
    start "" "C:\XAMPP_NEW\xampp-control.exe"
    exit /b 1
)
echo    OK - MySQL running

REM Create database
echo [2/6] Membuat database...
"C:\XAMPP_NEW\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS bangkit;"
if %errorlevel% neq 0 (
    echo    GAGAL membuat database!
    pause
    exit /b 1
)
echo    OK - Database bangkit

REM Migrate
echo [3/6] Migrasi database...
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan migrate --force
if %errorlevel% neq 0 (
    echo    GAGAL migrasi! Cek error di atas.
    pause
    exit /b 1
)
echo    OK - Migration selesai

REM Create user
echo [4/6] Membuat user test...
php create-test-user.php
echo    OK - User test dibuat

REM Clear cache
echo [5/6] Clear cache Laravel...
php artisan config:clear >nul 2>&1
php artisan cache:clear >nul 2>&1
echo    OK - Cache cleared

REM Kill port 8080
echo [6/6] Membersihkan port 8080...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8080.*LISTENING') do (
    taskkill /F /PID %%a >nul 2>&1
)
echo    OK - Port 8080 bersih

echo.
echo ========================================
echo   Setup Selesai!
echo ========================================
echo.
echo Sekarang akan membuka 2 terminal:
echo   - Terminal 1: Backend (Laravel)
echo   - Terminal 2: Frontend (Vite)
echo.
echo JANGAN TUTUP terminal yang terbuka!
echo.
pause

REM Start backend
start "BANGKIT Backend" cmd /k "cd /d c:\XAMPP_NEW\htdocs\web framework\backend && echo Starting Laravel Backend... && php artisan serve --port=8080"

REM Wait
timeout /t 3 >nul

REM Start frontend
start "BANGKIT Frontend" cmd /k "cd /d c:\XAMPP_NEW\htdocs\web framework\frontend && echo Starting Vite Frontend... && npm run dev"

REM Wait
timeout /t 5 >nul

echo.
echo ========================================
echo   Servers sedang starting...
echo ========================================
echo.
echo Tunggu beberapa detik, lalu:
echo.
echo 1. Lihat terminal Frontend (akan muncul URL)
echo 2. Buka URL tersebut di browser
echo 3. Login dengan:
echo    Email: test@bangkit.com
echo    Password: password123
echo.
echo ========================================
pause
