# 🚀 BANGKIT - Quick Start Guide

## Langkah Cepat Setup

### 1️⃣ Pastikan XAMPP MySQL Berjalan
Buka **XAMPP Control Panel** → Start **MySQL**

### 2️⃣ Buat Database
Buka phpMyAdmin atau jalankan:
```powershell
mysql -u root -e "CREATE DATABASE bangkit;"
```

### 3️⃣ Jalankan Setup Otomatis
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework"
.\setup.ps1
```

### 4️⃣ Start Servers
```powershell
.\start.ps1
```

**Atau manual:**
```powershell
# Terminal 1 - Backend
cd backend
php artisan serve --port=8080

# Terminal 2 - Frontend  
cd frontend
npm run dev
```

---

## 🔐 Login

Buka browser: **http://localhost:5173**

**Kredensial:**
- Email: `test@bangkit.com`
- Password: `password123`

Atau klik tombol **Guest** untuk login langsung.

---

## ✅ Checklist
- [ ] MySQL di XAMPP running
- [ ] Database `bangkit` dibuat
- [ ] Backend server running di port 8080
- [ ] Frontend server running di port 5173
- [ ] Bisa login dengan tampilan yang sama seperti desain

---

📖 Panduan lengkap ada di `SETUP_GUIDE.md`
