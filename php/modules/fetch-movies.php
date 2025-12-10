<?php
include "../config/db.php";

// Fetch all movies
$stmt = $conn->query("SELECT * FROM movies");
$movies = $stmt->fetch_all(MYSQLI_ASSOC);

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

header("Content-Type: application/json");
echo json_encode($movies);
