# BANGKIT - Start Both Servers
# This script starts both backend and frontend servers

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Starting BANGKIT Application" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "Starting Backend Server (Port 8080)..." -ForegroundColor Yellow
Write-Host "Starting Frontend Server (Port 5173)..." -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Gray
Write-Host ""

# Start Backend in background
$backend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\XAMPP_NEW\htdocs\web framework\backend'; Write-Host '=== BACKEND SERVER ===' -ForegroundColor Green; php artisan serve --port=8080" -PassThru

# Wait a bit for backend to start
Start-Sleep -Seconds 2

# Start Frontend in background
$frontend = Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\XAMPP_NEW\htdocs\web framework\frontend'; Write-Host '=== FRONTEND SERVER ===' -ForegroundColor Cyan; npm run dev" -PassThru

Write-Host "✓ Backend server started (PID: $($backend.Id))" -ForegroundColor Green
Write-Host "✓ Frontend server started (PID: $($frontend.Id))" -ForegroundColor Green
Write-Host ""
Write-Host "Backend:  http://127.0.0.1:8080" -ForegroundColor Cyan
Write-Host "Frontend: http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "To stop servers, close the terminal windows or run:" -ForegroundColor Yellow
Write-Host "  Stop-Process -Id $($backend.Id)" -ForegroundColor Gray
Write-Host "  Stop-Process -Id $($frontend.Id)" -ForegroundColor Gray
Write-Host ""

# Keep script running
Write-Host "Press any key to stop all servers..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

# Stop processes
Stop-Process -Id $backend.Id -ErrorAction SilentlyContinue
Stop-Process -Id $frontend.Id -ErrorAction SilentlyContinue

Write-Host "Servers stopped." -ForegroundColor Red
