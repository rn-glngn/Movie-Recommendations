<?php
header('Content-Type: application/json');
include '../../config/db.php';

try {
    $stmt = $conn->query("SELECT * FROM genres ORDER BY genre_name ASC");
    $genres = [];
    while ($row = $stmt->fetch_assoc()) {
        $genres[] = $row;
    }

    echo json_encode([
        'success' => true,
        'genres' => $genres
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
