<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");

require_once "connection.php"; // include your database connection

// --- Validate ID ---
if (!isset($_GET["id"]) || empty($_GET["id"])) {
    echo json_encode([
        "status" => "error",
        "message" => "Movie ID is required"
    ]);
    exit;
}

$movie_id = intval($_GET["id"]);

// --- Fetch movie ---
$sql = "SELECT * FROM movies WHERE movie_id = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $movie_id);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode([
        "status" => "not_found",
        "message" => "Movie not found",
        "data" => null
    ]);
    exit;
}

$movie = $result->fetch_assoc();

// --- Return JSON ---
echo json_encode([
    "status" => "success",
    "data" => $movie
], JSON_PRETTY_PRINT);

$stmt->close();
$conn->close();
?>
