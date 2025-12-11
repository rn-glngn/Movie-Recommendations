<?php
require "connection.php";

// Check if genre_id is provided
if (!isset($_GET['genre_id'])) {
    echo json_encode(["error" => "genre_id is required"]);
    exit;
}

$genre_id = intval($_GET['genre_id']); // sanitize input

$sql = "
    SELECT 
        m.movie_id,
        m.title,
        m.poster_url,
        m.release_date,
        m.type
    FROM movie_genres mg
    JOIN movies m ON mg.movie_id = m.movie_id
    WHERE mg.genre_id = ?
    ORDER BY m.title ASC
";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $genre_id);
$stmt->execute();
$result = $stmt->get_result();

$movies = [];

while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode($movies);
?>
