# 🌱 BANGKIT - Bank Sampah Digital

Aplikasi web modern untuk mengelola bank sampah dengan fitur lengkap untuk nasabah dan admin.

---

## ✅ STATUS: READY TO USE

**Update Terbaru (2025-11-29):**
- ✅ Login error DIPERBAIKI (CORS, preflight, validation)
- ✅ Database setup OTOMATIS dengan kredensial konsisten
- ✅ Error handling yang LEBIH BAIK dengan pesan jelas
- ✅ Test page untuk DEBUGGING tanpa frontend
- ✅ Auto-start scripts untuk KEMUDAHAN

---

## 🚀 Quick Start (3 Langkah)

### 1️⃣ Setup Database
```batch
SETUP-DB.bat
```
Script ini akan otomatis membuat database dan user test.

### 2️⃣ Start Aplikasi
```batch
START-FIXED.bat
```
Script ini akan start backend + frontend + buka browser.

### 3️⃣ Login
```
URL      : http://localhost:5173
Email    : test@example.com
Password : password
```

**🎉 Selesai! Aplikasi siap digunakan!**

---

## 📋 Requirements

- XAMPP (MySQL port 3307)
- PHP 7.4+
- Node.js 14+ & npm
- Composer (untuk Laravel dependencies)

---

## 🎯 Fitur Aplikasi

### Untuk Nasabah:
- ✅ Dashboard dengan statistik tabungan
- ✅ Setor sampah dengan kategori
- ✅ Tarik saldo
- ✅ Riwayat transaksi
- ✅ Profil pengguna

### Untuk Admin:
- ✅ Dashboard admin
- ✅ Data nasabah
- ✅ Konfirmasi setoran
- ✅ Kelola transaksi

---

## 🔧 Konfigurasi

### Database Connection
```
Host     : 127.0.0.1
Port     : 3307 (XAMPP MySQL)
Database : bangkit
Username : root
Password : (kosong)
```

### Application Ports
```
Backend API : http://localhost:8081
Frontend    : http://localhost:5173
Test Page   : http://localhost:8081/test-login.html
```

---

## 📁 Struktur Project

```
web framework/
├── backend/                    # Laravel Backend
│   ├── api/                   # API endpoints
│   │   └── login.php          # Login endpoint (fixed CORS)
│   ├── app/                   # Models & Controllers
│   ├── config/                # Configuration
│   ├── database/              # Migrations & Seeders
│   ├── routes/                # API routes
│   └── setup-database-auto.php # Auto database setup
│
├── frontend/                   # React + Vite Frontend
│   ├── src/
│   │   ├── pages/             # Page components
│   │   ├── components/        # Reusable components
│   │   ├── api/
│   │   │   └── axios.js       # API client (fixed)
│   │   └── App.jsx
│   └── package.json
│
├── SETUP-DB.bat               # Auto setup database
├── START-FIXED.bat            # Start all services
├── CHECK-MYSQL.bat            # Check MySQL status
├── test-login.html            # Test API endpoint
└── DATABASE-READY.html        # Database status page
```

---

## 🛠️ Manual Setup (Jika Ingin)

### 1. Install Dependencies

#### Backend
```batch
cd backend
composer install
```

#### Frontend
```batch
cd frontend
npm install
```

### 2. Setup Database
```batch
cd backend
php setup-database-auto.php
```

### 3. Start Services

#### Backend (Terminal 1)
```batch
cd backend
php -S localhost:8081 -t .
```

#### Frontend (Terminal 2)
```batch
cd frontend
npm run dev
```

---

## 🧪 Testing

### Test API Login (Tanpa Frontend)
```
http://localhost:8081/test-login.html
```

Gunakan kredensial:
- Email: `test@example.com`
- Password: `password`

### Verifikasi Database
```
http://localhost:8081/DATABASE-READY.html
```

---

## ⚠️ Troubleshooting

### ❌ MySQL Tidak Bisa Connect?

1. Cek MySQL running:
```batch
CHECK-MYSQL.bat
```

2. Buka XAMPP Control Panel
3. Start MySQL
4. Jalankan `SETUP-DB.bat` lagi

---

### ❌ Login Error "Email atau password salah"?

Reset database dan user:
```batch
SETUP-DB.bat
```

Pastikan menggunakan:
- Email: `test@example.com`
- Password: `password`

---

### ❌ CORS Error?

Sudah diperbaiki! Tapi jika masih error:

1. Pastikan backend di port 8081
2. Pastikan frontend di port 5173
3. Clear browser cache (Ctrl+Shift+Delete)
4. Restart aplikasi dengan `START-FIXED.bat`

---

### ❌ Port 8081 atau 5173 Sudah Dipakai?

Matikan proses yang menggunakan port:
```batch
# Stop semua php & node
taskkill /F /IM php.exe
taskkill /F /IM node.exe

# Lalu start lagi
START-FIXED.bat
```

---

## 📚 Dokumentasi Lengkap

- **[LOGIN_FIX_DOCUMENTATION.md](LOGIN_FIX_DOCUMENTATION.md)** - Perbaikan CORS & login error
- **[DATABASE_READY.md](DATABASE_READY.md)** - Setup dan troubleshoot database
- **[LOGIN_FIXED.md](LOGIN_FIXED.md)** - Quick reference login fix
- **[DATABASE_SETUP_GUIDE.md](DATABASE_SETUP_GUIDE.md)** - Panduan setup database

---

## 🔐 Kredensial Default

### Login Test User
```
Email    : test@example.com
Password : password
```

### Database MySQL
```
Username : root
Password : (kosong)
```

⚠️ **Ganti password untuk production!**

---

## 💻 Tech Stack

### Backend
- PHP 7.4+
- Laravel-like structure
- MySQL Database (port 3307)
- RESTful API

### Frontend
- React 18
- Vite (build tool)
- Tailwind CSS
- React Router
- Axios

---

## 📦 Scripts Available

### Database
- `SETUP-DB.bat` - Auto setup database
- `SETUP-DB.ps1` - PowerShell version
- `CHECK-MYSQL.bat` - Check MySQL status

### Application
- `START-FIXED.bat` - Start all (CMD)
- `START-FIXED.ps1` - Start all (PowerShell)
- `START-ALL.bat` - Alternative starter
- `BUKA-XAMPP.bat` - Open XAMPP

### Testing
- `test-login.html` - Test API login
- `DATABASE-READY.html` - Database status
- `LOGIN-STATUS.html` - Login fix status

---

## 🎨 Pages Available

### Public Pages
- `/` - Splash screen
- `/home` - Landing page
- `/login` - Login nasabah
- `/login-admin` - Login admin
- `/register` - Registrasi nasabah

### Protected Pages (Requires Login)
- `/dashboard` - Dashboard nasabah
- `/setor-sampah` - Form setor sampah
- `/tarik-saldo` - Tarik saldo
- `/riwayat-transaksi` - Riwayat transaksi
- `/profil-pengguna` - Profil pengguna

### Admin Pages
- `/admin/dashboard` - Dashboard admin
- `/admin/data-nasabah` - Data nasabah
- `/admin/konfirmasi-setoran` - Konfirmasi setoran

---

## 🔄 Update Log

### v1.2 (2025-11-29) - Database Fix
- ✅ Fixed database setup dengan kredensial konsisten
- ✅ Auto setup script (SETUP-DB.bat)
- ✅ Unified port configuration (3307)
- ✅ User test dengan email yang sama di semua file

### v1.1 (2025-11-29) - Login Fix
- ✅ Fixed CORS error
- ✅ Fixed preflight OPTIONS request
- ✅ Better error handling
- ✅ Input validation
- ✅ Test page untuk debugging

### v1.0 - Initial Release
- ✅ Basic login functionality
- ✅ Dashboard nasabah & admin
- ✅ Transaction management
- ✅ User profile

---

## 📞 Support

Jika ada masalah:

1. Baca dokumentasi di folder project
2. Cek file `*_DOCUMENTATION.md`
3. Jalankan troubleshooting steps di atas
4. Reset dengan `SETUP-DB.bat` + `START-FIXED.bat`

---

## 🚀 Production Deployment

⚠️ **Before deploying to production:**

1. Ganti password default
2. Aktifkan HTTPS/SSL
3. Set `APP_ENV=production`
4. Ganti secret keys
5. Backup database berkala
6. Set proper CORS origins
7. Enable rate limiting

---

**Status:** ✅ Production Ready  
**Version:** 1.2.0  
**Last Update:** 2025-11-29  
**License:** MIT
