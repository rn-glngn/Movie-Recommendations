<?php
include "../config/db.php";

$movie_id = intval($_GET['id'] ?? 0);

if ($movie_id <= 0) {
  echo json_encode([]);
  exit;
}

// Fetch movie info
$stmt = $conn->prepare("SELECT * FROM movies WHERE movie_id = ?");
$stmt->bind_param("i", $movie_id);
$stmt->execute();
$result = $stmt->get_result();
$movie = $result->fetch_assoc() ?: [];

// Optionally, fetch genres
$genreStmt = $conn->prepare("
    SELECT genre_id FROM movie_genres WHERE movie_id = ?
");
$genreStmt->bind_param("i", $movie_id);
$genreStmt->execute();
$genreResult = $genreStmt->get_result();
$genres = [];
while ($row = $genreResult->fetch_assoc()) {
  $genres[] = $row['genre_id'];
}
$movie['genres'] = $genres;

header("Content-Type: application/json");
echo json_encode($movie);
