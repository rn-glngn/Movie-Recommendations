<?php
include '../../config/db.php';
session_start();

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $movie_id = intval($_POST['movie_id'] ?? 0);
  $movie_title = $conn->real_escape_string($_POST['movie_title'] ?? '');
  $delete_reason = $conn->real_escape_string($_POST['delete_reason'] ?? '');
  $user_id = $_SESSION['user_id'] ?? null;

  if ($user_id && $movie_id && $movie_title) {
    $request_data = json_encode([
      'movie_id' => $movie_id,
      'title' => $movie_title,
      'reason' => $delete_reason
    ]);

    $stmt = $conn->prepare("
            INSERT INTO movie_requests (user_id, request_type, title, request_data, status)
            VALUES (?, 'delete', ?, ?, 'pending')
        ");
    $stmt->bind_param("iss", $user_id, $movie_title, $request_data);

    if ($stmt->execute()) {
      echo "<script>
                    alert('Deletion request sent to the admins.');
                    window.location.href='dashboard.php';
                  </script>";
    } else {
      echo "<script>alert('Error: " . $conn->error . "');</script>";
    }
    $stmt->close();
  } else {
    echo "<script>alert('Please select a movie.');</script>";
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
  <link rel="stylesheet" href="../../../assets/styles/form-delete.css">
  <link rel="icon" href="../../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../../assets/scripts/globals.js" defer></script>
  <script src="../../../assets/scripts/delete-movie.js" defer></script>
  <title>Delete Movie Request — FilmoPicks</title>
</head>

<body>
  <header>
    <?php include "../../includes/header.php"; ?>
  </header>

  <div class="main-container">
    <h1 class="page-header">Delete Movie</h1>

    <div class="form-container">
      <form method="POST">
        <input type="hidden" name="movie_id" id="movie_id" value="0">

        <div class="form-group">
          <label for="movie-title">Movie Title</label>
          <input type="text" name="movie_title" id="movie-title" placeholder="Type to search..." autocomplete="off" required>
          <div id="searchResults" class="search-results"></div>
        </div>

        <div class="form-group">
          <label for="delete-reason">Reason for Deletion</label>
          <textarea name="delete_reason" id="delete-reason" placeholder="Enter reason here..."></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-cancel" onclick="window.location.href='dashboard.php'">Cancel</button>
          <button type="submit" class="btn btn-delete">Request Deletion</button>
        </div>
      </form>
    </div>
  </div>
</body>

</html>