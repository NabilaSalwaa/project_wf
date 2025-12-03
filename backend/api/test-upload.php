<?php
header('Content-Type: application/json');

// Log request details for debugging
$debug = [
    'method' => $_SERVER['REQUEST_METHOD'],
    'post_data' => $_POST,
    'files' => isset($_FILES) ? array_keys($_FILES) : [],
    'file_details' => $_FILES ?? [],
    'headers' => getallheaders()
];

echo json_encode([
    'success' => true,
    'debug' => $debug,
    'message' => 'Test endpoint working'
], JSON_PRETTY_PRINT);
