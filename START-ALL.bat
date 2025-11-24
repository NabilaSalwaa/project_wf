@echo off
echo ==========================================
echo  BANGKIT - START ALL SERVERS
echo ==========================================
echo.

REM Stop existing processes
echo Stopping existing processes...
taskkill /F /IM node.exe >nul 2>&1
taskkill /F /IM php.exe >nul 2>&1
timeout /t 2 >nul

REM Start Backend
echo Starting Backend Server...
start "BACKEND" cmd /k "cd /d c:\XAMPP_NEW\htdocs\web framework\laravel_temp && php artisan serve --port=8000"
timeout /t 3 >nul

REM Start Frontend
echo Starting Frontend Server...
start "FRONTEND" cmd /k "cd /d c:\XAMPP_NEW\htdocs\web framework\frontend && npm run dev"
timeout /t 5 >nul

echo.
echo ==========================================
echo  SERVERS STARTED!
echo ==========================================
echo.
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://localhost:5173
echo.
echo Login dengan:
echo   Email: test@bangkit.com
echo   Password: password123
echo.
echo Membuka browser...
timeout /t 2 >nul
start http://localhost:5173

echo.
echo Tekan tombol apa saja untuk keluar...
pause >nul
