<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'Ahmad Rizki',
            'email' => 'test@bangkit.com',
            'password' => Hash::make('password123'),
            'address' => 'Jakarta, Indonesia',
            'phone' => '081234567890',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        // Tambahkan user dummy lainnya jika perlu
        DB::table('users')->insert([
            'name' => 'Budi Santoso',
            'email' => 'budi@bangkit.com',
            'password' => Hash::make('password123'),
            'address' => 'Bandung, Indonesia',
            'phone' => '082234567890',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
