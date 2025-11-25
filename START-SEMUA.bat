@echo off
title BANGKIT - All Servers
color 0A

echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║         BANGKIT WEB FRAMEWORK SERVERS           ║
echo ╚═══════════════════════════════════════════════════╝
echo.
echo Starting Backend (Port 3000)...
start "Backend Server" /min cmd /k "cd /d "c:\XAMPP_NEW\htdocs\web framework\backend" && color 0B && echo Backend Running on http://127.0.0.1:3000 && php -S 127.0.0.1:3000 -t public"

timeout /t 2 /nobreak >nul

echo Starting Frontend (Port dinamis)...
start "Frontend Server" /min cmd /k "cd /d "c:\XAMPP_NEW\htdocs\web framework\frontend" && color 0A && echo Frontend Running... && npm run dev"

timeout /t 3 /nobreak >nul

echo.
echo ╔═══════════════════════════════════════════════════╗
echo ║              SERVERS SUDAH JALAN!               ║
echo ╠═══════════════════════════════════════════════════╣
echo ║ Backend  : http://127.0.0.1:3000                ║
echo ║ Frontend : LIHAT PORT DI TERMINAL FRONTEND      ║
echo ╠═══════════════════════════════════════════════════╣
echo ║ LOGIN CREDENTIALS:                              ║
echo ║ Email    : test@bangkit.com                     ║
echo ║ Password : password123                          ║
echo ╚═══════════════════════════════════════════════════╝
echo.
echo BUKA BROWSER KE ALAMAT YANG MUNCUL DI TERMINAL FRONTEND (contoh: http://localhost:5175)
timeout /t 2 /nobreak >nul
REM start http://localhost:5175

echo.
echo JANGAN TUTUP WINDOW INI!
echo Jangan tutup window Backend dan Frontend yang muncul!
echo.
pause
