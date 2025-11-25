# 🔄 Cara Restart Aplikasi (Sudah Diperbaiki)

## ✅ Masalah yang Sudah Diperbaiki:
- ✅ CORS configuration ditambahkan
- ✅ Sanctum stateful domains diperbaiki
- ✅ Database connection dikonfigurasi
- ✅ User test dibuat

---

## 🚀 Langkah Restart:

### 1️⃣ Pastikan MySQL Running di XAMPP
Buka **XAMPP Control Panel** → Klik **Start** pada MySQL

### 2️⃣ Stop Semua Terminal Backend/Frontend yang Sedang Berjalan
Tekan `Ctrl+C` di semua terminal yang menjalankan server

### 3️⃣ Start Backend Server (Terminal 1)
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan serve --port=8080
```
**Jangan tutup terminal ini!**

### 4️⃣ Start Frontend Server (Terminal 2)
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\frontend"
npm run dev
```
**Jangan tutup terminal ini!**

### 5️⃣ Buka Browser
Kunjungi: **http://localhost:5173**

### 6️⃣ Login
**Kredensial:**
- Email: `test@bangkit.com`
- Password: `password123`

---

## 🔥 Shortcut (PowerShell)

```powershell
cd "c:\XAMPP_NEW\htdocs\web framework"

# Start Backend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\XAMPP_NEW\htdocs\web framework\backend'; php artisan serve --port=8080"

# Tunggu 2 detik
Start-Sleep -Seconds 2

# Start Frontend
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'c:\XAMPP_NEW\htdocs\web framework\frontend'; npm run dev"
```

---

## ⚡ Atau Gunakan Batch File

Klik 2x pada: **START-ALL.bat**

---

## 🛠️ Troubleshooting

### Error: "Invalid credentials"
**Solusi:** 
1. Pastikan backend sudah running di port 8080
2. Cek apakah user test ada dengan menjalankan:
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php create-test-user.php
```

### Error: CORS/Network
**Solusi:** Sudah diperbaiki. Restart backend server.

### Port 8080 sudah digunakan
**Solusi:** Ganti port di `.env` frontend:
```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```
Dan start backend dengan:
```powershell
php artisan serve --port=8000
```

---

## ✅ Checklist Sebelum Login:
- [ ] MySQL di XAMPP running (lampu hijau)
- [ ] Backend server running di `http://127.0.0.1:8080`
- [ ] Frontend server running di `http://localhost:5173`
- [ ] Browser dibuka di `http://localhost:5173`
- [ ] Gunakan kredensial: `test@bangkit.com` / `password123`

---

**Selamat mencoba! Login seharusnya sudah berhasil sekarang! 🎉**
