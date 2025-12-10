<?php
include "../config/db.php";

$q = $_GET['q'] ?? "";
$q = $conn->real_escape_string($q);

if ($q === "") {
  echo json_encode([]);
  exit;
}

$stmt = $conn->prepare("SELECT movie_id, title FROM movies WHERE title LIKE ? LIMIT 10");
$search = "%$q%";
$stmt->bind_param("s", $search);
$stmt->execute();
$result = $stmt->get_result();

$movies = [];
while ($row = $result->fetch_assoc()) {
  $movies[] = $row;
}

header("Content-Type: application/json");
echo json_encode($movies);
