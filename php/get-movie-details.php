<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

try {
    $movieId = $_GET['id'] ?? null;
    
    if(!$movieId) {
        echo json_encode(['success' => false, 'message' => 'Movie ID required']);
        exit();
    }
    
    $database = new Database();
    $conn = $database->getConnection();
    
    // Get movie details (matching your database fields)
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
        WHERE movie_id = :id
    ");
    $stmt->bindParam(':id', $movieId);
    $stmt->execute();
    $movie = $stmt->fetch();
    
    if(!$movie) {
        echo json_encode(['success' => false, 'message' => 'Movie not found']);
        exit();
    }
    
    // Get genres
    $stmt = $conn->prepare("
        SELECT g.genre_id, g.genre_name 
        FROM genres g
        JOIN movie_genres mg ON g.genre_id = mg.genre_id
        WHERE mg.movie_id = :id
    ");
    $stmt->bindParam(':id', $movieId);
    $stmt->execute();
    $movie['genres'] = $stmt->fetchAll(PDO::FETCH_COLUMN, 1);
    
    // Get cast & crew
    $stmt = $conn->prepare("
        SELECT p.*, mp.character_name, mp.role
        FROM people p
        JOIN movie_people mp ON p.person_id = mp.person_id
        WHERE mp.movie_id = :id
    ");
    $stmt->bindParam(':id', $movieId);
    $stmt->execute();
    $movie['cast'] = $stmt->fetchAll();
    
    // Get reviews (with user info)
    $stmt = $conn->prepare("
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
        WHERE r.movie_id = :id
        ORDER BY r.created_at DESC
    ");
    $stmt->bindParam(':id', $movieId);
    $stmt->execute();
    $movie['reviews'] = $stmt->fetchAll();
    
    // Calculate average rating from reviews
    if(!empty($movie['reviews'])) {
        $totalRating = array_sum(array_column($movie['reviews'], 'rating'));
        $movie['average_rating'] = round($totalRating / count($movie['reviews']), 1);
        $movie['review_count'] = count($movie['reviews']);
    } else {
        $movie['average_rating'] = 0;
        $movie['review_count'] = 0;
    }
    
    echo json_encode(['success' => true, 'movie' => $movie]);
    
} catch(Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Error: ' . $e->getMessage()]);
}
?>