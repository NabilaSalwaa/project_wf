# Setup Database BANGKIT

## Langkah-langkah Setup Database

### 1. Pastikan XAMPP MySQL Berjalan
- Buka XAMPP Control Panel
- Start Apache dan MySQL

### 2. Buat Database
Buka browser dan akses: `http://localhost/phpmyadmin`

Atau jalankan perintah SQL:
```sql
CREATE DATABASE bangkit CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 3. Jalankan Migration
Buka terminal di folder backend dan jalankan:
```powershell
cd "c:\XAMPP_NEW\htdocs\web framework\backend"
php artisan migrate
```

### 4. Jalankan Seeder (Isi Data Dummy)
```powershell
php artisan db:seed
```

Atau jalankan semuanya sekaligus:
```powershell
php artisan migrate:fresh --seed
```

## Data Login Dummy

Setelah menjalankan seeder, Anda bisa login dengan:

### User 1:
- **Email**: `test@bangkit.com`
- **Password**: `password123`
- **Nama**: Ahmad Rizki

### User 2:
- **Email**: `budi@bangkit.com`
- **Password**: `password123`
- **Nama**: Budi Santoso

## Troubleshooting

### Error: Access denied for user 'root'@'localhost'
Pastikan password MySQL di file `.env` sesuai dengan password MySQL Anda:
```
DB_PASSWORD=
```
Jika MySQL Anda ada password, ubah menjadi:
```
DB_PASSWORD=password_anda
```

### Error: Database 'bangkit' doesn't exist
Buat database terlebih dahulu melalui phpMyAdmin atau SQL command.

### Error: Nothing to migrate
Database sudah ter-setup. Gunakan `php artisan migrate:fresh --seed` untuk reset dan isi ulang data.
