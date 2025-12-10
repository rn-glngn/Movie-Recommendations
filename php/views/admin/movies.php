<?php include "../../config/db.php";

// Fetch all movies
$moviesQuery = "
    SELECT movie_id, title, poster_url, type, created_at
    FROM movies
    ORDER BY created_at DESC
";
$moviesResult = $conn->query($moviesQuery);
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../../assets/styles/admin-movies.css">
  <link rel="icon" href="../../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../../assets/scripts/globals.js" defer></script>
  <script src="../../../assets/scripts/admin-movies.js" defer></script>
  <title>FilmoPicks: Admin — Movie List</title>
</head>

<body>
  <!-- Navigation bar -->
  <?php include "../../includes/header-admin.php"; ?>

  <div class="main-container">
    <!-- Sidebar -->
    <?php include "../../includes/sidebar-admin.php"; ?>

    <!-- Main Content -->
    <div class="main-content">
      <div class="movie-list-section">
        <div class="title-section">
          <h1>Movie List</h1>
        </div>
        <div class="tabs">
          <button class="tab active" data-tab="all">ALL</button>
          <button class="tab" data-tab="movies">MOVIES</button>
          <button class="tab" data-tab="tv">TV SHOWS</button>
        </div>
        <div class="content-wrapper">
          <div class="controls">
            <div class="search-requests">
              <input type="text" id="searchInput" placeholder="Search Movies...">
              <span class="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg></span>
            </div>
            <div class="sort-section">
              <div class="sort-label">
                <div class="sort-arrows">
                  <div class="arrow arrow-up"></div>
                  <div class="arrow arrow-down"></div>
                </div>
                <span>Sort by:</span>
              </div>
              <div class="sort-dropdown">
                <select class="sort-select" id="sortSelect">
                  <option valu e="earliest">Earliest</option>
                  <option value="oldest">Oldest</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
                <div class="dropdown-arrow"></div>
              </div>
            </div>
          </div>
          <div class="movie-grid" id="movieGrid">
            <?php
            if ($moviesResult && $moviesResult->num_rows > 0) {
              while ($movie = $moviesResult->fetch_assoc()) {
                $poster = $movie['poster_url'] ? $movie['poster_url'] : '../../assets/images/default-poster.jpg';
                $type = htmlspecialchars($movie['type']);
                $title = htmlspecialchars($movie['title']);

                $timestamp = strtotime($movie['created_at']);
                $formattedDate = date("Y-m-d h:i A", $timestamp);

                echo '<div class="movie-card" data-title="' . $title . '" data-type="' . $type . '" data-date="' . $formattedDate . '">';
                echo '  <img src="' . $poster . '" alt="Movie Poster" class="movie-poster">';
                echo '  <div class="movie-title">' . $title . '</div>';
                echo '  <div class="edit-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">';
                echo '    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/></svg></div>';
                echo '</div>';
              }
            } else {
              echo '<div class="no-results">No movies found</div>';
            }
            ?>
          </div>

          <div class="no-results" id="noResults" style="display: none;">No results found</div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>