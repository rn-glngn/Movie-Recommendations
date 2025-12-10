<?php
header("Content-Type: application/json");

require_once "../db/connection.php"; // include connection

$sql = "SELECT * FROM Titles WHERE type = 'movie'";
$result = $conn->query($sql);

$movies = [];

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $movies[] = $row;
    }
}

echo json_encode($movies);

$conn->close();
?>
