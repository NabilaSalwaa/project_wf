@echo off
cd /d "c:\xampp_new\mysql\bin"
mysql.exe -u root -P 3307 -e "USE bangkit; UPDATE users SET password='$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi' WHERE email='ahmadrizki@gmail.com';"
echo Password berhasil direset untuk ahmadrizki@gmail.com
echo Password baru: password
pause
