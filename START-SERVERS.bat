@echo off
echo Starting BANGKIT Servers...
echo.

REM Start Backend Laravel
start "BANGKIT Backend" cmd /k "cd backend && php artisan serve"

REM Wait 3 seconds
timeout /t 3 /nobreak

REM Start Frontend Vite
start "BANGKIT Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo ========================================
echo BANGKIT Servers Started!
echo ========================================
echo Backend:  http://127.0.0.1:8000
echo Frontend: http://localhost:5173
echo ========================================
echo.
echo Press any key to close this window...
pause > nul
