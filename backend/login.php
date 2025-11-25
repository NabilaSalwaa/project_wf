<?php

// Simple login API with SQLite (no MySQL)
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get POST data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input || !isset($input['email']) || !isset($input['password'])) {
    http_response_code(400);
    echo json_encode(['message' => 'Email and password required']);
    exit();
}

try {
    // Connect to SQLite database
    $dbPath = __DIR__ . '/database.sqlite';
    
    if (!file_exists($dbPath)) {
        http_response_code(500);
        echo json_encode(['message' => 'Database not found. Please run setup-sqlite.php first']);
        exit();
    }
    
    $pdo = new PDO('sqlite:' . $dbPath);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Find user
    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$input['email']]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        http_response_code(401);
        echo json_encode(['message' => 'Invalid credentials']);
        exit();
    }
    
    // Verify password
    if (!password_verify($input['password'], $user['password'])) {
        http_response_code(401);
        echo json_encode(['message' => 'Invalid credentials']);
        exit();
    }
    
    // Generate simple token
    $token = bin2hex(random_bytes(32));
    
    // Update remember token
    $stmt = $pdo->prepare("UPDATE users SET remember_token = ? WHERE id = ?");
    $stmt->execute([$token, $user['id']]);
    
    // Return success
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
