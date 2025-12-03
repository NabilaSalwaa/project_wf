<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verify admin authentication
$headers = getallheaders();
$token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

if (!$token) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    exit();
}

try {
    $host = '127.0.0.1';
    $port = '3307';
    $dbname = 'bangkit';
    $username = 'root';
    $password = '';
    
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Verify token and check if admin
    $stmt = $pdo->prepare("SELECT * FROM users WHERE remember_token = ?");
    $stmt->execute([$token]);
    $admin = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$admin) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid token']);
        exit();
    }
    
    // GET - List all setoran with user info
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->prepare("
            SELECT 
                s.*,
                u.name as user_name,
                u.email as user_email
            FROM setoran_sampah s
            JOIN users u ON s.user_id = u.id
            ORDER BY s.created_at DESC
        ");
        $stmt->execute();
        $setoran = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $setoran
        ]);
        exit();
    }
    
    // PUT - Update status setoran (approve/reject)
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $input = json_decode(file_get_contents('php://input'), true);
        
        $setoran_id = $input['setoran_id'] ?? null;
        $status = $input['status'] ?? null; // 'approved' atau 'rejected'
        $catatan = $input['catatan'] ?? '';
        
        if (!$setoran_id || !$status) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'setoran_id dan status harus diisi']);
            exit();
        }
        
        if (!in_array($status, ['approved', 'rejected'])) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Status harus approved atau rejected']);
            exit();
        }
        
        // Update status
        $stmt = $pdo->prepare("
            UPDATE setoran_sampah 
            SET status = ?, catatan = ?, updated_at = NOW()
            WHERE id = ?
        ");
        $stmt->execute([$status, $catatan, $setoran_id]);
        
        // Get updated record
        $stmt = $pdo->prepare("SELECT * FROM setoran_sampah WHERE id = ?");
        $stmt->execute([$setoran_id]);
        $setoran = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'message' => 'Status setoran berhasil diupdate',
            'data' => $setoran
        ]);
        exit();
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
