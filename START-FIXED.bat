@echo off
echo ========================================
echo   RESTART ^& TEST LOGIN - BANGKIT APP
echo ========================================
echo.

echo [1/6] Menghentikan proses yang berjalan...
taskkill /F /IM php.exe >nul 2>&1
taskkill /F /IM node.exe >nul 2>&1
timeout /t 2 >nul
echo      Proses dihentikan

echo.
echo [2/6] Memulai Backend Server (Port 8081)...
cd /d "C:\XAMPP_NEW\htdocs\web framework\backend"
start "Backend Server" cmd /k "php -S localhost:8081 -t ."
timeout /t 3 >nul
echo      Backend started at http://localhost:8081

echo.
echo [3/6] Memulai Frontend Server (Port 5173)...
cd /d "C:\XAMPP_NEW\htdocs\web framework\frontend"
start "Frontend Server" cmd /k "npm run dev"
timeout /t 5 >nul
echo      Frontend started at http://localhost:5173

echo.
echo [4/6] Membuka Test Login Page...
timeout /t 2 >nul
start http://localhost:8081/TEST-LOGIN-FIX.html
echo      Test page dibuka

echo.
echo [5/6] Membuka Aplikasi...
timeout /t 2 >nul
start http://localhost:5173
echo      Aplikasi dibuka

echo.
echo ========================================
echo   APLIKASI BERHASIL DIJALANKAN!
echo ========================================
echo.
echo Backend  : http://localhost:8081
echo Frontend : http://localhost:5173
echo Test API : http://localhost:8081/test-login.html
echo.
echo PERBAIKAN YANG TELAH DILAKUKAN:
echo - CORS headers diperbaiki
echo - Preflight OPTIONS request handling
echo - Error handling lebih baik
echo - Validasi input di frontend
echo - Response format konsisten
echo.
echo Kredensial Login:
echo.
echo NASABAH:
echo   Email    : ahmadriski@gmail.com
echo   Password : password
echo.
echo ADMIN:
echo   Email    : admin@bangkit.com
echo   Password : admin123
echo.
pause
