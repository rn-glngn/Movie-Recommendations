<?php include '../../config/db.php';
session_start();

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $movie_id = intval($_POST['movie_id'] ?? 0);
  $movie_title = trim($_POST['movie_title'] ?? '');
  $delete_reason = trim($_POST['delete_reason'] ?? '');
  $user_id = $_SESSION['user_id'] ?? null;

  // Debug: Log the values
  error_log("POST data: " . print_r($_POST, true));
  error_log("movie_id: " . $movie_id);
  error_log("movie_title: '" . $movie_title . "'");
  error_log("user_id: " . $user_id);

  $movie_title_escaped = $conn->real_escape_string($movie_title);
  $delete_reason_escaped = $conn->real_escape_string($delete_reason);

  // Check if movie_id is greater than 0
  if ($user_id && $movie_id > 0 && !empty($movie_title)) {
    $request_data = json_encode([
      'movie_id' => $movie_id,
      'title' => $movie_title,
      'reason' => $delete_reason
    ]);

    $stmt = $conn->prepare("
            INSERT INTO movie_requests (user_id, request_type, title, request_data, status)
            VALUES (?, 'delete', ?, ?, 'pending')
        ");
    $stmt->bind_param("iss", $user_id, $movie_title_escaped, $request_data);

    if ($stmt->execute()) {
      $stmt->close();
      // Use session to pass success message
      $_SESSION['success_message'] = 'Deletion request sent to the admins.';
      header('Location: dashboard.php');
      exit();
    } else {
      $error = $conn->error;
      $stmt->close();
      echo "<script>alert('Error: " . htmlspecialchars($error) . "');</script>";
    }
  } else {
    // Better error message for debugging
    error_log("Validation failed - user_id: " . ($user_id ? 'OK' : 'FAIL') .
      ", movie_id: " . $movie_id .
      ", movie_title empty: " . (empty($movie_title) ? 'YES' : 'NO'));

    if (!$user_id) {
      $_SESSION['error_message'] = 'User not logged in.';
    } elseif ($movie_id <= 0) {
      $_SESSION['error_message'] = 'Please select a movie from the search results.';
    } elseif (empty($movie_title)) {
      $_SESSION['error_message'] = 'Movie title is empty. Please select a movie from the search results.';
    } else {
      $_SESSION['error_message'] = 'Please fill in all required fields.';
    }

    // Redirect to prevent form resubmission
    header('Location: delete-movie.php');
    exit();
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

    <?php if (isset($_SESSION['success_message'])): ?>
      <div class="alert alert-success">
        <?php
        echo htmlspecialchars($_SESSION['success_message']);
        unset($_SESSION['success_message']);
        ?>
      </div>
    <?php endif; ?>

    <?php if (isset($_SESSION['error_message'])): ?>
      <div class="alert alert-error">
        <?php
        echo htmlspecialchars($_SESSION['error_message']);
        unset($_SESSION['error_message']);
        ?>
      </div>
    <?php endif; ?>

    <div class="form-container">
      <form id="deleteForm" method="POST" action="delete-movie.php">
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
          <button type="button" class="btn btn-cancel" onclick="window.location.href='delete-movie.php'">Cancel</button>
          <button type="submit" class="btn btn-delete">Request Deletion</button>
        </div>
      </form>
    </div>
  </div>
</body>

</html>