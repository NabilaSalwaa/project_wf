<?php

header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Accept, Authorization');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Verify user is authenticated (disabled for testing)
$headers = getallheaders();
$token = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : null;

// Temporary: Use default user ID 1 for testing
$userId = 1;

/*
if (!$token) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Unauthorized - Token required']);
    exit();
}
*/

try {
    // Connect to database
    $host = '127.0.0.1';
    $port = '3307';
    $dbname = 'bangkit';
    $username = 'root';
    $password = '';
    
    $dsn = "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4";
    $pdo = new PDO($dsn, $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Verify token and get user (disabled for testing)
    /*
    $stmt = $pdo->prepare("SELECT * FROM users WHERE remember_token = ?");
    $stmt->execute([$token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$user) {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Invalid token']);
        exit();
    }
    */
    
    // Use default user for testing
    $user = ['id' => $userId, 'name' => 'Test User'];
    
    // Handle GET request - Get user's setoran history
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $stmt = $pdo->prepare("
            SELECT * FROM setoran_sampah 
            WHERE user_id = ? 
            ORDER BY created_at DESC
        ");
        $stmt->execute([$user['id']]);
        $setoran = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'data' => $setoran
        ]);
        exit();
    }
    
    // Handle POST request - Create new setoran
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Debug logging
        error_log("POST Request received");
        error_log("FILES: " . print_r($_FILES, true));
        error_log("POST: " . print_r($_POST, true));
        
        // Check if file was uploaded
        if (!isset($_FILES['foto_sampah']) || $_FILES['foto_sampah']['error'] !== UPLOAD_ERR_OK) {
            http_response_code(400);
            $error_msg = isset($_FILES['foto_sampah']) ? 'Upload error: ' . $_FILES['foto_sampah']['error'] : 'No file uploaded';
            echo json_encode(['success' => false, 'message' => 'Foto sampah harus diupload', 'error' => $error_msg]);
            exit();
        }
        
        // Get form data
        $jenis_sampah = $_POST['jenis_sampah'] ?? null;
        $berat = $_POST['berat'] ?? null;
        $harga_per_kg = $_POST['harga_per_kg'] ?? null;
        $catatan = $_POST['catatan'] ?? '';
        
        // Validate required fields
        if (!$jenis_sampah || !$berat || !$harga_per_kg) {
            http_response_code(400);
            echo json_encode(['success' => false, 'message' => 'Semua field harus diisi']);
            exit();
        }
        
        // Calculate total
        $total_harga = floatval($berat) * floatval($harga_per_kg);
        
        // Handle file upload
        $upload_dir = __DIR__ . '/../storage/uploads/';
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }
        
        $file_extension = pathinfo($_FILES['foto_sampah']['name'], PATHINFO_EXTENSION);
        $new_filename = 'sampah_' . $user['id'] . '_' . time() . '.' . $file_extension;
        $upload_path = $upload_dir . $new_filename;
        
        if (!move_uploaded_file($_FILES['foto_sampah']['tmp_name'], $upload_path)) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => 'Gagal mengupload foto']);
            exit();
        }
        
        // Save to database
        $stmt = $pdo->prepare("
            INSERT INTO setoran_sampah 
            (user_id, jenis_sampah, berat, harga_per_kg, total_harga, foto_sampah, catatan, status, created_at, updated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, 'pending', NOW(), NOW())
        ");
        
        $stmt->execute([
            $user['id'],
            $jenis_sampah,
            $berat,
            $harga_per_kg,
            $total_harga,
            $new_filename,
            $catatan
        ]);
        
        $setoran_id = $pdo->lastInsertId();
        
        // Get the created record
        $stmt = $pdo->prepare("SELECT * FROM setoran_sampah WHERE id = ?");
        $stmt->execute([$setoran_id]);
        $setoran = $stmt->fetch(PDO::FETCH_ASSOC);
        
        echo json_encode([
            'success' => true,
            'message' => 'Setoran berhasil disimpan',
            'data' => $setoran
        ]);
        exit();
    }
    
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
}
