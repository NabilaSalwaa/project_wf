# BANGKIT - Quick Setup Script
# Run this after installing Composer and Node.js

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  BANGKIT - Bank Sampah Digital Setup" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""

# Backend Setup
Write-Host "[1/6] Setting up Backend..." -ForegroundColor Yellow
Set-Location "c:\XAMPP_NEW\htdocs\web framework\backend"

Write-Host "  - Installing Composer dependencies..." -ForegroundColor Gray
composer install --quiet

Write-Host "  - Generating application key..." -ForegroundColor Gray
php artisan key:generate --quiet

Write-Host "  - Running migrations..." -ForegroundColor Gray
php artisan migrate --force

Write-Host "[✓] Backend setup complete!" -ForegroundColor Green
Write-Host ""

# Frontend Setup
Write-Host "[2/6] Setting up Frontend..." -ForegroundColor Yellow
Set-Location "c:\XAMPP_NEW\htdocs\web framework\frontend"

Write-Host "  - Installing npm dependencies..." -ForegroundColor Gray
npm install --silent

Write-Host "[✓] Frontend setup complete!" -ForegroundColor Green
Write-Host ""

# Create Test User
Write-Host "[3/6] Creating test user..." -ForegroundColor Yellow
Set-Location "c:\XAMPP_NEW\htdocs\web framework\backend"

$createUser = @"
`$user = App\Models\User::firstOrCreate(
    ['email' => 'test@bangkit.com'],
    ['name' => 'Test User', 'password' => Hash::make('password123')]
);
echo 'User created: ' . `$user->email;
"@

php artisan tinker --execute="$createUser"

Write-Host "[✓] Test user created!" -ForegroundColor Green
Write-Host ""

Write-Host "==================================================" -ForegroundColor Cyan
Write-Host "  Setup Complete!" -ForegroundColor Green
Write-Host "==================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor White
Write-Host "1. Start Backend:  php artisan serve --port=8080" -ForegroundColor Cyan
Write-Host "2. Start Frontend: npm run dev" -ForegroundColor Cyan
Write-Host ""
Write-Host "Login credentials:" -ForegroundColor White
Write-Host "  Email:    test@bangkit.com" -ForegroundColor Yellow
Write-Host "  Password: password123" -ForegroundColor Yellow
Write-Host ""
Write-Host "Access frontend at: http://localhost:5173" -ForegroundColor Green
Write-Host ""
