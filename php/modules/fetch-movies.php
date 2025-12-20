<?php
include "../config/db.php";

// Fetch all movies
$stmt = $conn->query("SELECT * FROM movies");
$movies = [];
if ($stmt) {
  $movies = $stmt->fetch_all(MYSQLI_ASSOC);
}

// Generate weekly seed
$week = (int)date("W"); // current ISO week number
shuffleWithSeed($movies, $week);

// Seeded shuffle function
function shuffleWithSeed(&$array, $seed)
{
  srand($seed);
  for ($i = count($array) - 1; $i > 0; $i--) {
    $j = rand(0, $i);
    $tmp = $array[$i];
    $array[$i] = $array[$j];
    $array[$j] = $tmp;
  }
  srand(); // reset seed
}

$sql = "
SELECT 
  m.*,
  GROUP_CONCAT(g.genre_name) AS genres
FROM movies m
LEFT JOIN movie_genres mg ON m.movie_id = mg.movie_id
LEFT JOIN genres g ON mg.genre_id = g.genre_id
GROUP BY m.movie_id
ORDER BY m.created_at DESC
";

$result = $conn->query($sql);
$movies = [];

if ($result) {
  while ($row = $result->fetch_assoc()) {
    $row['genres'] = $row['genres']
      ? explode(',', $row['genres'])
      : [];
    $movies[] = $row;
  }
}

header("Content-Type: application/json");
echo json_encode($movies);
