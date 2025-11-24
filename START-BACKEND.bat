@echo off
echo ========================================
echo SETUP FINAL - BANGKIT LOGIN
echo ========================================
echo.
echo [PENTING] Pastikan MySQL di XAMPP sudah START (hijau)!
echo.
pause

cd "c:\XAMPP_NEW\htdocs\web framework\laravel_temp"

echo.
echo [1/3] Running migrations...
php artisan migrate --force

echo.
echo [2/3] Creating test user...
php artisan tinker --execute="App\Models\User::firstOrCreate(['email'=>'test@bangkit.com'],['name'=>'Test User','password'=>Hash::make('password123')]);"

echo.
echo [3/3] Starting backend server...
echo.
echo Backend akan running di: http://127.0.0.1:8000
echo Frontend sudah running di: http://localhost:5173
echo.
echo Login dengan:
echo   Email: test@bangkit.com
echo   Password: password123
echo.
echo Atau klik tombol GUEST
echo.
php artisan serve --port=8000
