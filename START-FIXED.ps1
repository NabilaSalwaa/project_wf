# Script untuk test dan restart aplikasi dengan perbaikan login

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  RESTART & TEST LOGIN - BANGKIT APP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Cek apakah ada proses yang berjalan dan hentikan
Write-Host "[1/6] Menghentikan proses yang berjalan..." -ForegroundColor Yellow
Get-Process | Where-Object {$_.ProcessName -like "*php*" -or $_.ProcessName -like "*node*"} | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "     Proses dihentikan" -ForegroundColor Green

# Pindah ke direktori backend
Write-Host ""
Write-Host "[2/6] Memulai Backend Server (Port 8081)..." -ForegroundColor Yellow
$backendPath = "C:\XAMPP_NEW\htdocs\web framework\backend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$backendPath'; php -S localhost:8081 -t ."
Start-Sleep -Seconds 3
Write-Host "     Backend started at http://localhost:8081" -ForegroundColor Green

# Pindah ke direktori frontend
Write-Host ""
Write-Host "[3/6] Memulai Frontend Server (Port 5173)..." -ForegroundColor Yellow
$frontendPath = "C:\XAMPP_NEW\htdocs\web framework\frontend"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$frontendPath'; npm run dev"
Start-Sleep -Seconds 5
Write-Host "     Frontend started at http://localhost:5173" -ForegroundColor Green

# Buka test page
Write-Host ""
Write-Host "[4/6] Membuka Test Login Page..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:8081/TEST-LOGIN-FIX.html"
Write-Host "     Test page dibuka" -ForegroundColor Green

Write-Host ""
Write-Host "[5/6] Membuka Aplikasi..." -ForegroundColor Yellow
Start-Sleep -Seconds 2
Start-Process "http://localhost:5173"
Write-Host "     Aplikasi dibuka" -ForegroundColor Green

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "  APLIKASI BERHASIL DIJALANKAN!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Backend  : http://localhost:8081" -ForegroundColor White
Write-Host "Frontend : http://localhost:5173" -ForegroundColor White
Write-Host "Test API : http://localhost:8081/test-login.html" -ForegroundColor White
Write-Host ""
Write-Host "PERBAIKAN YANG TELAH DILAKUKAN:" -ForegroundColor Cyan
Write-Host "- CORS headers diperbaiki" -ForegroundColor White
Write-Host "- Preflight OPTIONS request handling" -ForegroundColor White
Write-Host "- Error handling lebih baik" -ForegroundColor White
Write-Host "- Validasi input di frontend" -ForegroundColor White
Write-Host "- Response format konsisten" -ForegroundColor White
Write-Host ""
Write-Host "Kredensial Login:" -ForegroundColor Yellow
Write-Host ""
Write-Host "NASABAH:" -ForegroundColor Cyan
Write-Host "  Email    : ahmadriski@gmail.com" -ForegroundColor White
Write-Host "  Password : password" -ForegroundColor White
Write-Host ""
Write-Host "ADMIN:" -ForegroundColor Cyan
Write-Host "  Email    : admin@bangkit.com" -ForegroundColor White
Write-Host "  Password : admin123" -ForegroundColor White
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
