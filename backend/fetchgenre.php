<?php
require "connection.php";

// Query: get movies + genres
$sql = "
    SELECT 
        m.movie_id,
        m.title,
        g.genre_name
    FROM movie_genres mg
    JOIN movies m ON mg.movie_id = m.movie_id
    JOIN genres g ON mg.genre_id = g.genre_id
    ORDER BY m.movie_id ASC, g.genre_name ASC
";

$result = $conn->query($sql);

$movies = [];

// Group genre names per movie
while ($row = $result->fetch_assoc()) {
    $id = $row['movie_id'];

    if (!isset($movies[$id])) {
        $movies[$id] = [
            "movie_id" => $row["movie_id"],
            "title"    => $row["title"],
            "genres"   => []
        ];
    }
    $movies[$id]["genres"][] = $row["genre_name"];
}

echo json_encode(array_values($movies));
