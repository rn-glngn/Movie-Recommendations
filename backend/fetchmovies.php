<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow frontend access

require_once "connection.php"; // Database connection

$sql = "SELECT * FROM movies ORDER BY created_at DESC";
$result = $conn->query($sql);

$movies = [];

if ($result && $result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $movies[] = [
            "movie_id"       => $row["movie_id"],
            "title"          => $row["title"],
            "description"    => $row["description"],
            "synopsis"       => $row["synopsis"],
            "release_date"   => $row["release_date"],
            "duration"       => $row["duration"],
            "type"           => $row["type"],
            "poster_url"     => $row["poster_url"],
            "background_url" => $row["background_url"],
            "trailer_url"    => $row["trailer_url"],
            "language"       => $row["language"],
            "created_at"     => $row["created_at"],
            "updated_at"     => $row["updated_at"]
        ];
    }
}

echo json_encode([
    "status" => "success",
    "count"  => count($movies),
    "data"   => $movies
], JSON_PRETTY_PRINT);

$conn->close();
?>