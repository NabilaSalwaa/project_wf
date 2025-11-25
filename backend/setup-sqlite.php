<?php
// Setup with SQLite (no MySQL needed)
header('Content-Type: text/plain; charset=utf-8');

echo "=== BANGKIT - Setup Database (SQLite) ===\n\n";

try {
    // Create SQLite database
    echo "[1/3] Creating SQLite database...\n";
    $dbPath = __DIR__ . '/database.sqlite';
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    echo "      ✓ Database created at: " . $dbPath . "\n\n";
    
    // Create users table
    echo "[2/3] Creating users table...\n";
    $pdo->exec("DROP TABLE IF EXISTS users");
    $pdo->exec("CREATE TABLE users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        remember_token TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )");
    echo "      ✓ Table created\n\n";
    
    // Create test user
    echo "[3/3] Creating user 'test@bangkit.com'...\n";
    $passwordHash = password_hash('password123', PASSWORD_BCRYPT);
    $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
    $stmt->execute(['Test User', 'test@bangkit.com', $passwordHash]);
    
    $userId = $pdo->lastInsertId();
    echo "      ✓ User created!\n";
    echo "      ID: $userId\n";
    echo "      Email: test@bangkit.com\n";
    echo "      Password: password123\n\n";
    
    echo "==========================================\n";
    echo "  ✓✓✓ SETUP COMPLETE WITH SQLite! ✓✓✓\n";
    echo "==========================================\n\n";
    echo "Login credentials:\n";
    echo "  Email: test@bangkit.com\n";
    echo "  Password: password123\n\n";
    echo "Database file: database.sqlite\n";
    
} catch (PDOException $e) {
    echo "\n✗ ERROR:\n";
    echo $e->getMessage() . "\n";
}
