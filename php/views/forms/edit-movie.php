<?php

include "../../config/db.php";

session_start();

// Fetch all genres for checkboxes
$genresResult = $conn->query("SELECT genre_id, genre_name FROM genres ORDER BY genre_name ASC");
$all_genres = $genresResult ? $genresResult->fetch_all(MYSQLI_ASSOC) : [];

// Fetch streaming services for dropdown
$servicesResult = $conn->query("SELECT service_id, service_name FROM services ORDER BY service_name ASC");
$services = $servicesResult ? $servicesResult->fetch_all(MYSQLI_ASSOC) : [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $movie_id = intval($_POST['movie_id'] ?? 0);
  $title = $conn->real_escape_string($_POST['title']);
  $type = $conn->real_escape_string($_POST['type']);
  $release_date = $_POST['release_date'];
  $duration = $conn->real_escape_string($_POST['duration']);
  $trailer_url = $conn->real_escape_string($_POST['trailer_url']);
  $service_id = intval($_POST['service_id']);
  $genres = $_POST['genres'] ?? [];
  $synopsis = $conn->real_escape_string($_POST['synopsis']);

  // JSON request data for admin review
  $request_data = json_encode([
    'movie_id' => $movie_id,
    'type' => $type,
    'release_date' => $release_date,
    'duration' => $duration,
    'trailer_url' => $trailer_url,
    'service_id' => $service_id,
    'genres' => $genres,
    'synopsis' => $synopsis,
  ]);

  $user_id = $_SESSION['user_id'] ?? null;

  if ($user_id) {
    $stmt = $conn->prepare("
      INSERT INTO movie_requests (user_id, request_type, title, request_data, status)
      VALUES (?, 'edit', ?, ?, 'pending')
    ");
    $stmt->bind_param("iss", $user_id, $title, $request_data);

    if ($stmt->execute()) {
      echo "<script>alert('Edit request submitted for review.'); window.location.href='dashboard.php';</script>";
    } else {
      echo "<script>alert('Error: " . $conn->error . "');</script>";
    }
    $stmt->close();
  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="../../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../../assets/styles/form.css">
  <link rel="icon" href="../../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../../assets/scripts/globals.js" defer></script>
  <script src="../../../assets/scripts/edit-movie.js" defer></script>
  <title>Edit Movie Request — FilmoPicks: Your Movie TV Show Recommendations</title>
</head>

<body>
  <header>
    <?php include "../../includes/header.php"; ?>
  </header>

  <div class="main-container">
    <h1 class="page-header">Edit Movie Details</h1>

    <div class="form-container">
      <form action="" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="movie_id" id="movie_id" value="0">

        <div class="movie-info-section">
          <div class="photo-upload">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            <p>Add photo here</p>
          </div>

          <div class="movie-fields">
            <div class="form-row">
              <div class="form-group">
                <label>Movie Title</label>
                <input type="text" id="movieSearch" name="title" placeholder="Type to search..." autocomplete="off" required>
                <div id="searchResults" class="search-results"></div>
              </div>
              <div class="form-group">
                <label>Type of Media</label>
                <select name="type" id="movie_type" required>
                  <option value="movie">Movie</option>
                  <option value="series">TV Show</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Release Date</label>
                <input type="date" name="release_date" id="release_date">
              </div>
              <div class="form-group">
                <label>Length of Time</label>
                <input type="text" name="duration" id="duration" placeholder="e.g., 120 min">
              </div>
            </div>

            <div class="form-group full-width">
              <label>Trailer Link</label>
              <input type="url" name="trailer_url" id="trailer_url" placeholder="https://...">
            </div>

            <div class="form-group full-width">
              <label>Streaming Platform</label>
              <select name="service_id" id="service_id">
                <option value="">Select a platform</option>
                <?php
                foreach ($services as $service) {
                  echo '<option value="' . $service['service_id'] . '">' . htmlspecialchars($service['service_name']) . '</option>';
                }
                ?>
              </select>
            </div>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Genres</h2>
          <div class="genres-grid">
            <?php
            $counter = 1;
            foreach ($all_genres as $genre) {
              echo '<div class="genre-item">';
              echo '<input type="checkbox" id="genre' . $counter . '" name="genres[]" value="' . $genre['genre_id'] . '">';
              echo '<label for="genre' . $counter . '">' . htmlspecialchars($genre['genre_name']) . '</label>';
              echo '</div>';
              $counter++;
            }
            ?>
          </div>
        </div>

        <div class="section">
          <h2 class="section-title">Synopsis</h2>
          <textarea name="synopsis" id="synopsis" placeholder="Add text here..."></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-cancel" onclick="window.location.href='dashboard.php'">Cancel</button>
          <button class="btn btn-save" type="submit" name="submit">Submit Changes</button>
        </div>
      </form>
    </div>
  </div>
</body>

</html>