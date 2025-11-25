# 🚨 LOGIN GAGAL - SOLUSI LENGKAP

## ❌ Masalah yang Terdeteksi:
1. ❌ **MySQL TIDAK RUNNING** - Ini penyebab utama!
2. ⚠️ Frontend berjalan di port 5175 (bukan 5173)
3. ⚠️ Port 8080 sudah digunakan

---

## ✅ SOLUSI STEP-BY-STEP

### 🔴 LANGKAH 1: START MYSQL (WAJIB!)
1. Buka **XAMPP Control Panel**
2. Cari baris **MySQL**
3. Klik tombol **Start**
4. Tunggu sampai muncul **warna hijau**
5. **JANGAN LANJUT** sebelum MySQL hijau!

### 🔴 LANGKAH 2: Buat Database
Setelah MySQL hijau, jalankan di PowerShell:
```powershell
& "C:\XAMPP_NEW\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS bangkit;"
```

### 🔴 LANGKAH 3: Migrasi Database
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan migrate
```

### 🔴 LANGKAH 4: Buat User Test
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php create-test-user.php
```

### 🔴 LANGKAH 5: Matikan Semua Server Yang Running
Tekan **Ctrl+C** di semua terminal yang terbuka, atau tutup semua terminal.

### 🔴 LANGKAH 6: Kill Port 8080
```powershell
$process = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) { Stop-Process -Id $process -Force }
```

### 🔴 LANGKAH 7: Start Backend (Terminal Baru)
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan serve --port=8080
```
**Lihat output:** Harus muncul "Laravel development server started on http://127.0.0.1:8080"
**JANGAN TUTUP TERMINAL INI!**

### 🔴 LANGKAH 8: Start Frontend (Terminal Baru)
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\frontend"
npm run dev
```
**Lihat output:** Akan muncul URL seperti "Local: http://localhost:5173"
**JANGAN TUTUP TERMINAL INI!**

### 🔴 LANGKAH 9: Buka Browser
Buka URL yang muncul di terminal frontend (biasanya http://localhost:5173 atau 5175)

### 🔴 LANGKAH 10: Login
- **Email:** test@bangkit.com
- **Password:** password123

---

## 🔥 AUTO SCRIPT (Jalankan Ini Jika Manual Gagal)

Salin dan jalankan di PowerShell:

```powershell
# Kill processes on port 8080
Write-Host "Membersihkan port 8080..." -ForegroundColor Yellow
$process = Get-NetTCPConnection -LocalPort 8080 -ErrorAction SilentlyContinue | Select-Object -ExpandProperty OwningProcess -Unique
if ($process) { Stop-Process -Id $process -Force }

# Check MySQL
Write-Host "Cek MySQL..." -ForegroundColor Yellow
$mysql = & "C:\XAMPP_NEW\mysql\bin\mysql.exe" -u root -e "SELECT 1;" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "MYSQL TIDAK RUNNING! Buka XAMPP dan start MySQL!" -ForegroundColor Red
    exit
}

# Create database
Write-Host "Membuat database..." -ForegroundColor Yellow
& "C:\XAMPP_NEW\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE IF NOT EXISTS bangkit;"

# Migrate
Write-Host "Migrasi database..." -ForegroundColor Yellow
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan migrate --force

# Create user
Write-Host "Membuat user test..." -ForegroundColor Yellow
php create-test-user.php

Write-Host "`n✅ Setup selesai! Sekarang jalankan server..." -ForegroundColor Green
Write-Host "`n1. Buka Terminal 1, jalankan:" -ForegroundColor Cyan
Write-Host "   cd 'c:\XAMPP_NEW\htdocs\web framework\backend'; php artisan serve --port=8080`n" -ForegroundColor White
Write-Host "2. Buka Terminal 2, jalankan:" -ForegroundColor Cyan
Write-Host "   cd 'c:\XAMPP_NEW\htdocs\web framework\frontend'; npm run dev`n" -ForegroundColor White
```

---

## 📋 CHECKLIST SEBELUM LOGIN

Pastikan SEMUA ini sudah ✅:

- [ ] XAMPP MySQL showing **GREEN** (paling penting!)
- [ ] Database `bangkit` sudah dibuat
- [ ] Migration sudah dijalankan (ada tabel users)
- [ ] User test sudah dibuat (test@bangkit.com)
- [ ] Backend running di http://127.0.0.1:8080
- [ ] Frontend running (cek URL di terminal)
- [ ] Browser dibuka di URL frontend
- [ ] Gunakan email: test@bangkit.com
- [ ] Gunakan password: password123

---

## 🛠️ TROUBLESHOOTING

### "Can't connect to MySQL server"
**❌ MySQL belum running!**
➡️ Buka XAMPP → Start MySQL → Tunggu hijau

### "Port 8080 is already in use"
```powershell
$process = Get-NetTCPConnection -LocalPort 8080 | Select-Object -ExpandProperty OwningProcess -Unique
Stop-Process -Id $process -Force
```

### "Invalid credentials"
➡️ User belum dibuat. Jalankan:
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php create-test-user.php
```

### "SQLSTATE[HY000] [1049] Unknown database"
➡️ Database belum dibuat:
```powershell
& "C:\XAMPP_NEW\mysql\bin\mysql.exe" -u root -e "CREATE DATABASE bangkit;"
```

### "Network Error" / "ERR_CONNECTION_REFUSED"
➡️ Backend tidak running. Start backend di port 8080.

---

## ⚡ SHORTCUT TERCEPAT

1. **Pastikan MySQL hijau di XAMPP**
2. **Jalankan ini:**
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework"

# Terminal 1 - Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\XAMPP_NEW\htdocs\web framework\backend'; php artisan serve --port=8080"

Start-Sleep -Seconds 3

# Terminal 2 - Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\XAMPP_NEW\htdocs\web framework\frontend'; npm run dev"

Start-Sleep -Seconds 5

# Buka browser
Start-Process "http://localhost:5173"
```

3. **Login:** test@bangkit.com / password123

---

**🎯 INGAT: Masalah utama adalah MySQL tidak running! Pastikan MySQL hijau di XAMPP Control Panel!**
