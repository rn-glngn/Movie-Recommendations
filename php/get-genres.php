<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    $stmt = $conn->query("SELECT * FROM genres ORDER BY genre_name ASC");
    $genres = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'genres' => $genres
    ]);
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

?>