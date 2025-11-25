<?php
// API Router for PHP built-in server
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization');
header('Access-Control-Allow-Credentials: true');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Route handling
$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Login endpoint
if ($uri === '/login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    $input = json_decode(file_get_contents('php://input'), true);
    
    if (!$input || !isset($input['email']) || !isset($input['password'])) {
        http_response_code(400);
        echo json_encode(['message' => 'Email and password required']);
        exit();
    }
    
    try {
        $pdo = new PDO('mysql:host=127.0.0.1;dbname=bangkit', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
        $stmt->execute([$input['email']]);
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user || !password_verify($input['password'], $user['password'])) {
            http_response_code(401);
            echo json_encode(['message' => 'Invalid credentials']);
            exit();
        }
        
        $token = bin2hex(random_bytes(32));
        
        $stmt = $pdo->prepare("UPDATE users SET remember_token = ? WHERE id = ?");
        $stmt->execute([$token, $user['id']]);
        
        echo json_encode([
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ],
            'token' => $token
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    }
    exit();
}

// Guest login
if ($uri === '/guest-login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    header('Content-Type: application/json');
    
    try {
        $pdo = new PDO('mysql:host=127.0.0.1;dbname=bangkit', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        $stmt = $pdo->prepare("SELECT * FROM users LIMIT 1");
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$user) {
            http_response_code(404);
            echo json_encode(['message' => 'No users found']);
            exit();
        }
        
        $token = bin2hex(random_bytes(32));
        
        echo json_encode([
            'user' => [
                'id' => $user['id'],
                'name' => 'Guest User',
                'email' => $user['email']
            ],
            'token' => $token
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['message' => 'Database error: ' . $e->getMessage()]);
    }
    exit();
}

// Setup endpoint
if ($uri === '/setup') {
    header('Content-Type: text/plain; charset=utf-8');
    
    echo "=== SETUP DATABASE & USER ===\n\n";
    
    try {
        $pdo = new PDO('mysql:host=127.0.0.1', 'root', '');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        echo "[1/4] Connected to MySQL\n";
        
        $pdo->exec("CREATE DATABASE IF NOT EXISTS bangkit");
        $pdo->exec("USE bangkit");
        echo "[2/4] Database 'bangkit' ready\n";
        
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
        echo "[3/4] Table 'users' created\n";
        
        $passwordHash = password_hash('password123', PASSWORD_BCRYPT);
        $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?, ?)");
        $stmt->execute(['Test User', 'test@bangkit.com', $passwordHash]);
        
        echo "[4/4] User created!\n";
        echo "\n=== SETUP COMPLETE ===\n";
        echo "Email: test@bangkit.com\n";
        echo "Password: password123\n";
        
    } catch (PDOException $e) {
        echo "\nERROR: " . $e->getMessage() . "\n";
    }
    exit();
}

// Default response
http_response_code(404);
header('Content-Type: application/json');
echo json_encode(['message' => 'Endpoint not found', 'uri' => $uri]);
