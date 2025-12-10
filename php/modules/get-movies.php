<?php
header('Content-Type: application/json');
include '../../config/db.php';

$type = $_GET['type'] ?? 'all'; // all, movie, series
$sort = $_GET['sort'] ?? 'latest';
$search = $_GET['search'] ?? '';
$genre = $_GET['genre'] ?? '';
$minRating = floatval($_GET['min_rating'] ?? 0);

// Base query
$query = "SELECT 
            m.movie_id,
            m.title,
            m.description,
            m.synopsis,
            m.release_date,
            m.duration,
            m.type,
            m.poster_url,
            m.background_url,
            m.trailer_url,
            m.language,
            m.created_at,
            m.updated_at,
            GROUP_CONCAT(DISTINCT g.genre_name) as genres
          FROM movies m 
          LEFT JOIN movie_genres mg ON m.movie_id = mg.movie_id
          LEFT JOIN genres g ON mg.genre_id = g.genre_id
          WHERE 1=1";

$params = [];
$types = ""; // for bind_param

// Filters
if ($type !== 'all') {
    $query .= " AND m.type = ?";
    $params[] = $type;
    $types .= "s";
}

if (!empty($search)) {
    $query .= " AND (m.title LIKE ? OR m.description LIKE ?)";
    $params[] = "%$search%";
    $params[] = "%$search%";
    $types .= "ss";
}

if (!empty($genre) && $genre !== 'any') {
    $query .= " AND EXISTS (
        SELECT 1 FROM movie_genres mg2 
        WHERE mg2.movie_id = m.movie_id AND mg2.genre_id = ?
    )";
    $params[] = $genre;
    $types .= "i";
}

$query .= " GROUP BY m.movie_id";

// Sorting
switch ($sort) {
    case 'oldest':
        $query .= " ORDER BY m.release_date ASC";
        break;
    case 'az':
        $query .= " ORDER BY m.title ASC";
        break;
    case 'za':
        $query .= " ORDER BY m.title DESC";
        break;
    case 'popularity':
        $query .= " ORDER BY m.created_at DESC";
        break;
    case 'rating':
        $query .= " ORDER BY m.title ASC";
        break;
    case 'random':
        $query .= " ORDER BY RAND()";
        break;
    default:
        $query .= " ORDER BY m.created_at DESC";
}

// Prepare and execute
$stmt = $conn->prepare($query);
if ($params) {
    $stmt->bind_param($types, ...$params);
}
$stmt->execute();
$result = $stmt->get_result();

$movies = [];
while ($row = $result->fetch_assoc()) {
    $movies[] = $row;
}

echo json_encode([
    'success' => true,
    'movies' => $movies,
    'count' => count($movies),
    'total' => count($movies)
]);
