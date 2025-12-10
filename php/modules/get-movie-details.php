<?php
header('Content-Type: application/json');
include '../../config/db.php';

$movieId = intval($_GET['id'] ?? 0);

if (!$movieId) {
    echo json_encode(['success' => false, 'message' => 'Movie ID required']);
    exit();
}

// Get movie details
$stmt = $conn->prepare("
    SELECT 
        movie_id,
        title,
        description,
        synopsis,
        release_date,
        duration,
        type,
        poster_url,
        background_url,
        trailer_url,
        language,
        created_at,
        updated_at
    FROM movies
    WHERE movie_id = ?
");
$stmt->bind_param("i", $movieId);
$stmt->execute();
$result = $stmt->get_result();
$movie = $result->fetch_assoc();

if (!$movie) {
    echo json_encode(['success' => false, 'message' => 'Movie not found']);
    exit();
}

// Get genres
$genreStmt = $conn->prepare("
    SELECT g.genre_id
    FROM genres g
    JOIN movie_genres mg ON g.genre_id = mg.genre_id
    WHERE mg.movie_id = ?
");
$genreStmt->bind_param("i", $movieId);
$genreStmt->execute();
$genreResult = $genreStmt->get_result();
$movie['genres'] = [];
while ($row = $genreResult->fetch_assoc()) {
    $movie['genres'][] = $row['genre_id'];
}

// Get cast & crew
$peopleStmt = $conn->prepare("
    SELECT p.person_id, p.name, mp.character_name, mp.role
    FROM people p
    JOIN movie_people mp ON p.person_id = mp.person_id
    WHERE mp.movie_id = ?
");
$peopleStmt->bind_param("i", $movieId);
$peopleStmt->execute();
$peopleResult = $peopleStmt->get_result();

$movie['cast'] = [];
$movie['crew'] = [];
while ($row = $peopleResult->fetch_assoc()) {
    if ($row['role'] === 'actor') {
        $movie['cast'][] = $row;
    } else {
        $movie['crew'][] = $row;
    }
}

// Get reviews
$reviewStmt = $conn->prepare("
    SELECT 
        r.review_id,
        r.rating,
        r.comment,
        r.created_at,
        u.user_id,
        u.username,
        u.fullname
    FROM reviews r
    JOIN users u ON r.user_id = u.user_id
    WHERE r.movie_id = ?
    ORDER BY r.created_at DESC
");
$reviewStmt->bind_param("i", $movieId);
$reviewStmt->execute();
$reviewResult = $reviewStmt->get_result();
$movie['reviews'] = [];
while ($row = $reviewResult->fetch_assoc()) {
    $movie['reviews'][] = $row;
}

// Average rating
if (!empty($movie['reviews'])) {
    $totalRating = array_sum(array_column($movie['reviews'], 'rating'));
    $movie['average_rating'] = round($totalRating / count($movie['reviews']), 1);
    $movie['review_count'] = count($movie['reviews']);
} else {
    $movie['average_rating'] = 0;
    $movie['review_count'] = 0;
}

echo json_encode(['success' => true, 'movie' => $movie]);
