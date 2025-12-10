<?php include "../../config/db.php";

// Fetch genres
$genresQuery = "SELECT genre_id, genre_name FROM genres ORDER BY genre_name ASC";
$genresResult = $conn->query($genresQuery);

// Fetch streaming platforms (services)
$servicesQuery = "SELECT service_id, service_name FROM services ORDER BY service_name ASC";
$servicesResult = $conn->query($servicesQuery);

session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Collect form data safely
  $title = $conn->real_escape_string($_POST['title']);
  $type = $conn->real_escape_string($_POST['type']);
  $release_date = $_POST['release_date'];
  $duration = $conn->real_escape_string($_POST['duration']);
  $trailer_url = $conn->real_escape_string($_POST['trailer_url']);
  $service_id = intval($_POST['service_id']);
  $genres = $_POST['genres'] ?? []; // array of selected genre IDs
  $synopsis = $conn->real_escape_string($_POST['synopsis']);

  // JSON object to store extra info
  $request_data = json_encode([
    'release_date' => $release_date,
    'duration' => $duration,
    'trailer_url' => $trailer_url,
    'service_id' => $service_id,
    'genres' => $genres,
    'synopsis' => $synopsis
  ]);

  // Get logged-in user ID
  $user_id = $_SESSION['user_id'] ?? null;

  if ($user_id) {
    $stmt = $conn->prepare("
            INSERT INTO movie_requests (user_id, request_type, title, request_data, status)
            VALUES (?, 'add', ?, ?, 'pending')
        ");
    $stmt->bind_param("iss", $user_id, $title, $request_data);

    if ($stmt->execute()) {
      echo "<script>alert('Movie request submitted successfully.'); window.location.href='index.php';</script>";
    } else {
      echo "<script>alert('Error submitting request: " . $conn->error . "');</script>";
    }

    $stmt->close();
  } else {
    echo "<script>alert('You must be logged in to submit a request.');</script>";
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
  <title>Add Movie Request — FilmoPicks: Your Movie TV Show Recommendations</title>
</head>

<body>
  <header>
    <?php include "../../includes/header.php"; ?>
  </header>

  <!-- Main Container -->
  <div class="main-container">
    <h1 class="page-header">Add Movie Details</h1>

    <div class="form-container">
      <form action="" method="POST" enctype="multipart/form-data">
        <!-- Movie Info Section -->
        <div class="movie-info-section">
          <div class="photo-upload">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
            </svg>
            <p>Add photo here</p>
          </div>

          <div class="movie-fields">
            <div class="form-row">
              <div class="form-group">
                <label>Movie Title</label>
                <input type="text" id="movieSearch" name="title" placeholder="Movie Title" autocomplete="off">
                <div id="searchResults" class="search-results"></div>
              </div>
              <div class="form-group">
                <label>Type of Media</label>
                <select name="type">
                  <option value="movie">Movie</option>
                  <option value="series">TV Show</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label>Release Date</label>
                <input type="date" name="release_date">
              </div>
              <div class="form-group">
                <label>Length of Time</label>
                <input type="text" name="duration" placeholder="1h 57m / 3 episodes">
              </div>
            </div>

            <div class="form-group full-width">
              <label>Trailer Link</label>
              <input type="url" name="trailer_url" placeholder="https://www.youtube.com/watch?v=abc123">
            </div>

            <div class="form-group full-width">
              <label>Streaming Platform</label>
              <select name="service_id">
                <?php
                if ($servicesResult && $servicesResult->num_rows > 0) {
                  while ($service = $servicesResult->fetch_assoc()) {
                    $id = $service['service_id'];
                    $name = htmlspecialchars($service['service_name']);
                    echo '<option value="' . $id . '">' . $name . '</option>';
                  }
                } else {
                  echo '<option value="">No platforms available</option>';
                }
                ?>
              </select>
            </div>
          </div>
        </div>

        <!-- Genres Section -->
        <div class="section">
          <h2 class="section-title">Genres</h2>
          <div class="genres-grid">
            <?php
            if ($genresResult && $genresResult->num_rows > 0) {
              $counter = 1;
              while ($genre = $genresResult->fetch_assoc()) {
                $id = $genre['genre_id'];
                $name = htmlspecialchars($genre['genre_name']);
                echo '<div class="genre-item">';
                echo '  <input type="checkbox" id="genre' . $counter . '" name="genres[]" value="' . $id . '">';
                echo '  <label for="genre' . $counter . '">' . $name . '</label>';
                echo '</div>';
                $counter++;
              }
            } else {
              echo '<p>No genres available</p>';
            }
            ?>
          </div>
        </div>

        <!-- Cast Section -->
        <div class="section">
          <h2 class="section-title">Cast</h2>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="text" placeholder="Actor name"></td>
                  <td><input type="text" placeholder="Character name"></td>
                </tr>
                <tr>
                  <td><input type="text" placeholder="Actor name"></td>
                  <td><input type="text" placeholder="Character name"></td>
                </tr>
                <tr>
                  <td><input type="text" placeholder="Actor name"></td>
                  <td><input type="text" placeholder="Character name"></td>
                </tr>
                <tr>
                  <td><input type="text" placeholder="Actor name"></td>
                  <td><input type="text" placeholder="Character name"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="add-more-btn">add more</button>
        </div>

        <!-- Crew Section -->
        <div class="section">
          <h2 class="section-title">Crew</h2>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="text" placeholder="Crew member name"></td>
                  <td><input type="text" placeholder="Position"></td>
                </tr>
                <tr>
                  <td><input type="text" placeholder="Crew member name"></td>
                  <td><input type="text" placeholder="Position"></td>
                </tr>
                <tr>
                  <td><input type="text" placeholder="Crew member name"></td>
                  <td><input type="text" placeholder="Position"></td>
                </tr>
                <tr>
                  <td><input type="text" placeholder="Crew member name"></td>
                  <td><input type="text" placeholder="Position"></td>
                </tr>
              </tbody>
            </table>
          </div>
          <button class="add-more-btn">add more</button>
        </div>

        <!-- Synopsis Section -->
        <div class="section">
          <h2 class="section-title">Synopsis</h2>
          <textarea name="synopsis" placeholder="Add text here..."></textarea>
        </div>

        <!-- Form Actions -->
        <div class="form-actions">
          <button class="btn btn-cancel">Cancel</button>
          <button class="btn btn-save" onclick="alert('Add Movie Request is Submitted to the Admins')">Submit
            Request</button>
        </div>
      </form>
    </div>
  </div>
</body>

</html>