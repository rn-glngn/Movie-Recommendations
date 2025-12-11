<?php
require "connection.php";

// Query only the genre_id column
$sql = "SELECT genre_name FROM genres";
$result = $conn->query($sql);

$genre_ids = [];

while ($row = $result->fetch_assoc()) {
    $genre_ids[] = $row['genre_name'];
}

// Return JSON
echo json_encode($genre_ids);
