<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Seed the users table with default users for BANGKIT application.
     * 
     * Creates 2 users:
     * 1. Nasabah (Regular User) - ahmadriski@gmail.com
     * 2. Admin - admin@bangkit.com
     * 
     * Run this seeder with: php artisan db:seed --class=UserSeeder
     */
    public function run()
    {
        // Clear existing users first (using delete instead of truncate to avoid FK constraint issues)
        DB::table('users')->delete();
        
        // User 1: NASABAH - Ahmad Rizki
        DB::table('users')->insert([
            'name' => 'Ahmad Rizki',
            'email' => 'ahmadrizki@gmail.com',
            'password' => Hash::make('password'),
            'role' => 'nasabah',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // User 2: ADMIN - Admin Bangkit
        DB::table('users')->insert([
            'name' => 'Admin Bangkit',
            'email' => 'admin@bangkit.com',
            'password' => Hash::make('admin123'),
            'role' => 'admin',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        
        echo "\n✅ UserSeeder berhasil!\n";
        echo "   2 user telah dibuat:\n";
        echo "   1. ahmadrizki@gmail.com (nasabah) - password: password\n";
        echo "   2. admin@bangkit.com (admin) - password: admin123\n\n";
    }
}
