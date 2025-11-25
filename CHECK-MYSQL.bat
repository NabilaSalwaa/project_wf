@echo off
echo.
echo Mengecek MySQL...
echo.

"C:\XAMPP_NEW\mysql\bin\mysql.exe" -u root -e "SELECT 'MySQL RUNNING - OK!' as Status;"

if %errorlevel% neq 0 (
    echo.
    echo ======================================
    echo   MySQL TIDAK RUNNING!
    echo ======================================
    echo.
    echo CARA MENYALAKAN:
    echo 1. Buka folder: C:\XAMPP_NEW
    echo 2. Double-click: xampp-control.exe
    echo 3. Cari baris "MySQL"
    echo 4. Klik tombol "Start"
    echo 5. Tunggu sampai HIJAU
    echo 6. Jalankan script ini lagi
    echo.
) else (
    echo.
    echo ======================================
    echo   MySQL SUDAH RUNNING - SIAP!
    echo ======================================
    echo.
    echo Sekarang bisa jalankan:
    echo    START-LOGIN-FIX.bat
    echo.
)

pause
