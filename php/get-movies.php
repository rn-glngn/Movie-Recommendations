<?php
header('Content-Type: application/json');
require_once '../../config/database.php';

try {
    $database = new Database();
    $conn = $database->getConnection();
    
    if(!$conn) {
        throw new Exception('Database connection failed');
    }
    
    // Get parameters
    $type = $_GET['type'] ?? 'all'; // all, movie, series
    $sort = $_GET['sort'] ?? 'latest';
    $search = $_GET['search'] ?? '';
    $genre = $_GET['genre'] ?? '';
    $minRating = $_GET['min_rating'] ?? 0;
    
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
    
    // Filters
    $params = [];
    
    if($type !== 'all') {
        $query .= " AND m.type = :type";
        $params[':type'] = $type;
    }
    
    if(!empty($search)) {
        $query .= " AND (m.title LIKE :search OR m.description LIKE :search)";
        $params[':search'] = "%$search%";
    }
    
    if(!empty($genre) && $genre !== 'any') {
        $query .= " AND EXISTS (
            SELECT 1 FROM movie_genres mg2 
            WHERE mg2.movie_id = m.movie_id AND mg2.genre_id = :genre
        )";
        $params[':genre'] = $genre;
    }
    
    $query .= " GROUP BY m.movie_id";
    
    // Sorting
    switch($sort) {
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
        default: // latest
            $query .= " ORDER BY m.created_at DESC";
    }
    
    // Prepare and execute
    $stmt = $conn->prepare($query);
    foreach($params as $key => $value) {
        $stmt->bindValue($key, $value);
    }
    $stmt->execute();
    $movies = $stmt->fetchAll();
    
    echo json_encode([
        'success' => true,
        'movies' => $movies,
        'count' => count($movies),
        'total' => count($movies) // same as count since no pagination
    ]);
    
} catch(Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage(),
        'movies' => [],
        'count' => 0,
        'total' => 0
    ]);
}
?>