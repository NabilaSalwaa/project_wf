# BANGKIT - Bank Sampah Digital

Aplikasi manajemen bank sampah dengan sistem login dan tracking transaksi.

## 🚀 Setup dan Instalasi

### Prerequisites
- XAMPP (Apache + MySQL)
- PHP 8.1 atau lebih tinggi
- Composer
- Node.js & npm

---

## 📦 Backend Setup (Laravel)

### 1. Install Dependencies Laravel
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
composer install
```

### 2. Generate Application Key
```powershell
php artisan key:generate
```

### 3. Setup Database MySQL

**Buka XAMPP Control Panel dan Start Apache + MySQL**

Kemudian buat database via phpMyAdmin atau MySQL command line:

```sql
CREATE DATABASE bangkit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Atau via command line:
```powershell
mysql -u root -e "CREATE DATABASE bangkit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
```

### 4. Jalankan Migrations
```powershell
php artisan migrate
```

### 5. (Opsional) Buat User Testing
Jalankan ini di terminal untuk membuat user testing:
```powershell
php artisan tinker
```

Kemudian di tinker console:
```php
$user = new App\Models\User();
$user->name = 'Test User';
$user->email = 'test@bangkit.com';
$user->password = Hash::make('password123');
$user->save();
exit
```

### 6. Jalankan Backend Server
```powershell
php artisan serve --port=8080
```

Backend akan berjalan di: **http://127.0.0.1:8080**

---

## 🎨 Frontend Setup (React + Vite)

### 1. Install Dependencies
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\frontend"
npm install
```

### 2. Konfigurasi Environment (Opsional)

Buat file `.env` di folder `frontend` jika diperlukan:
```
VITE_API_BASE_URL=http://127.0.0.1:8080/api
```

### 3. Jalankan Development Server
```powershell
npm run dev
```

Frontend akan berjalan di: **http://localhost:5173**

---

## 🔐 Testing Login

### Login dengan User yang Dibuat

1. Buka browser ke **http://localhost:5173**
2. Masukkan kredensial:
   - Email: `test@bangkit.com`
   - Password: `password123`
3. Klik tombol **Login**

### Login sebagai Guest

Klik tombol **Guest** untuk login otomatis tanpa registrasi.

---

## 📁 Struktur Database

### Tabel `users`
- id
- name
- email (unique)
- password
- timestamps

### Tabel `transactions`
- id
- user_id (foreign key)
- type (setor/tarik)
- category
- weight (decimal)
- amount (decimal)
- notes (nullable)
- timestamps

---

## 🛠️ Troubleshooting

### Error: "Class 'App\Models\User' not found"
```powershell
composer dump-autoload
```

### Error: "SQLSTATE[HY000] [1049] Unknown database 'bangkit'"
Pastikan database `bangkit` sudah dibuat di MySQL.

### Error: Port 8080 already in use
Gunakan port lain:
```powershell
php artisan serve --port=8000
```

Lalu update `axios.js` di frontend:
```javascript
const BASE = 'http://127.0.0.1:8000/api';
```

### Frontend tidak bisa connect ke backend
Pastikan:
1. Backend server berjalan di port 8080
2. CORS sudah dikonfigurasi (sudah include di config/sanctum.php)
3. File `frontend/src/api/axios.js` menggunakan base URL yang benar

---

## 📚 API Endpoints

### Authentication
- `POST /api/register` - Register user baru
- `POST /api/login` - Login dan dapat token
- `POST /api/guest-login` - Login sebagai guest
- `POST /api/logout` - Logout (authenticated)

### User
- `GET /api/user` - Get user info (authenticated)

### Dashboard
- `GET /api/summary` - Get dashboard summary (authenticated)

### Transactions
- `GET /api/transactions` - List transactions (authenticated)
- `POST /api/transactions` - Create transaction (authenticated)

---

## 👤 Author

BANGKIT - Bank Sampah Digital
