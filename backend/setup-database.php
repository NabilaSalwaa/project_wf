<?php
// Simple setup script without Laravel dependencies
header('Content-Type: text/plain; charset=utf-8');

echo "=== BANGKIT - Setup Database & User ===\n\n";

try {
    // Connect to MySQL
    echo "[1/4] Connecting to MySQL...\n";
    $pdo = new PDO('mysql:host=127.0.0.1', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "      ✓ Connected\n\n";
    
    // Create database
    echo "[2/4] Creating database 'bangkit'...\n";
    $pdo->exec("CREATE DATABASE IF NOT EXISTS bangkit");
    $pdo->exec("USE bangkit");
    echo "      ✓ Database ready\n\n";
    
    // Create users table
    echo "[3/4] Creating users table...\n";
    $pdo->exec("DROP TABLE IF EXISTS users");
    $pdo->exec("CREATE TABLE users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        remember_token VARCHAR(100) NULL,
        created_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
    echo "      ✓ Table created\n\n";
    
    // Create test user
    echo "[4/4] Creating user 'test@bangkit.com'...\n";
    $passwordHash = password_hash('password123', PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->execute(['Test User', 'test@bangkit.com', $passwordHash]);
    
    $userId = $pdo->lastInsertId();
    echo "      ✓ User created!\n";
    echo "      ID: $userId\n";
    echo "      Email: test@bangkit.com\n";
    echo "      Password: password123\n\n";
    
    echo "==========================================\n";
    echo "  ✓✓✓ SETUP COMPLETE! ✓✓✓\n";
    echo "==========================================\n\n";
    echo "Login credentials:\n";
    echo "  Email: test@bangkit.com\n";
    echo "  Password: password123\n\n";
    
} catch (PDOException $e) {
    echo "\n✗ DATABASE ERROR:\n";
    echo $e->getMessage() . "\n\n";
    echo "Pastikan MySQL sudah running di XAMPP!\n";
}
