# 🚀 Cara Menjalankan Login - Langkah Mudah

## ✅ Langkah 1: Start MySQL di XAMPP
1. Buka **XAMPP Control Panel**
2. Klik tombol **Start** pada baris **MySQL**
3. Tunggu sampai muncul warna hijau

## ✅ Langkah 2: Buat Database (Jalankan sekali saja)

Buka PowerShell dan jalankan:

```powershell
& "C:\XAMPP_NEW\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS bangkit;"
```

## ✅ Langkah 3: Jalankan Migration Database

```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan migrate
```

## ✅ Langkah 4: Buat User Test

```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan tinker
```

Lalu ketik di tinker:
```php
$user = new App\Models\User();
$user->name = 'Test User';
$user->email = 'test@bangkit.com';
$user->password = Hash::make('password123');
$user->save();
exit
```

## ✅ Langkah 5: Start Backend Server

Buka **PowerShell Terminal 1**:
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan serve --port=8080
```

**Jangan tutup terminal ini!** Biarkan tetap berjalan.

## ✅ Langkah 6: Start Frontend Server

Buka **PowerShell Terminal 2** (terminal baru):
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\frontend"
npm run dev
```

**Jangan tutup terminal ini!** Biarkan tetap berjalan.

## ✅ Langkah 7: Buka Browser

Buka browser dan kunjungi:
```
http://localhost:5173
```

## ✅ Langkah 8: Login

**Kredensial Login:**
- Email: `test@bangkit.com`
- Password: `password123`

Atau klik tombol **"Guest"** untuk login tanpa registrasi.

---

## 🔥 Shortcut - Start Semua Sekaligus

Jika MySQL sudah running, jalankan ini di PowerShell:

```powershell
cd "c:\XAMPP_NEW\htdocs\web framework"

# Terminal 1 - Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\XAMPP_NEW\htdocs\web framework\backend'; php artisan serve --port=8080"

# Tunggu 2 detik
Start-Sleep -Seconds 2

# Terminal 2 - Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\XAMPP_NEW\htdocs\web framework\frontend'; npm run dev"
```

---

## ❌ Troubleshooting

### Error: "SQLSTATE[HY000] [2002]"
**Solusi:** MySQL belum running. Start MySQL di XAMPP Control Panel.

### Error: "SQLSTATE[HY000] [1049] Unknown database"
**Solusi:** Database belum dibuat. Jalankan Langkah 2.

### Error: "No application encryption key"
**Solusi:** APP_KEY belum di-generate. Sudah otomatis ter-set di `.env`

### Login tidak berfungsi
**Solusi:** 
1. Pastikan backend running di port 8080
2. Pastikan database sudah ada dan migration sudah dijalankan
3. Pastikan user test sudah dibuat

---

## 📱 Tampilan Login

Anda akan melihat tampilan dengan:
- ✅ Sidebar hijau dengan logo BANGKIT
- ✅ Form Email dan Password
- ✅ Tombol "Login" hijau
- ✅ Tombol "Guest" untuk demo
- ✅ Desain sesuai dengan gambar yang Anda berikan
