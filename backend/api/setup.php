<?php
header('Content-Type: text/plain');

echo "=== SETUP DATABASE & USER ===\n\n";

try {
    // Direct PDO connection
    echo "[1/3] Connecting to database...\n";
    $pdo = new PDO('mysql:host=127.0.0.1;dbname=bangkit', 'root', '');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "      ✓ Connected to database: bangkit\n\n";
    
    // Create users table if not exists
    echo "[2/3] Creating users table...\n";
    $pdo->exec("CREATE TABLE IF NOT EXISTS users (
        id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP NULL DEFAULT NULL,
        updated_at TIMESTAMP NULL DEFAULT NULL
    )");
    echo "      ✓ Table created/exists\n\n";
    
    // Create test user
    echo "[3/3] Creating test user...\n";
    
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute(['test@bangkit.com']);
    $existingUser = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($existingUser) {
        echo "      ℹ User test@bangkit.com already exists\n";
        echo "      ID: " . $existingUser['id'] . "\n";
        echo "      Name: " . $existingUser['name'] . "\n";
    } else {
        $passwordHash = password_hash('password123', PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW())");
        $stmt->execute(['Test User', 'test@bangkit.com', $passwordHash]);
        
        echo "      ✓ User created successfully!\n";
        echo "      ID: " . $pdo->lastInsertId() . "\n";
        echo "      Email: test@bangkit.com\n";
        echo "      Password: password123\n";
    }
    
    echo "\n=== SETUP COMPLETE! ===\n";
    echo "\nYou can now login with:\n";
    echo "Email: test@bangkit.com\n";
    echo "Password: password123\n";
    
} catch (Exception $e) {
    echo "\n✗ ERROR: " . $e->getMessage() . "\n";
}
