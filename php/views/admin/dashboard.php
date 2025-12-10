<?php include "../../config/db.php";

// Count Movies
$movieQuery = "SELECT COUNT(*) AS total_movies FROM movies";
$movieResult = $conn->query($movieQuery);
$movieRow = $movieResult->fetch_assoc();
$totalMovies = $movieRow['total_movies'];

// Count Users
$userQuery = "SELECT COUNT(*) AS total_users FROM users WHERE role = 'user'";
$userResult = $conn->query($userQuery);
$userRow = $userResult->fetch_assoc();
$totalUsers = $userRow['total_users'];

// === MOST POPULAR GENRE ===
$popularQuery = "
    SELECT g.genre_name, AVG(r.rating) AS avg_rating
    FROM reviews r
    JOIN movies m ON r.movie_id = m.movie_id
    JOIN movie_genres mg ON m.movie_id = mg.movie_id
    JOIN genres g ON mg.genre_id = g.genre_id
    GROUP BY g.genre_id
    ORDER BY avg_rating DESC
    LIMIT 1
";

$popularResult = $conn->query($popularQuery);

if ($popularResult && $popularResult->num_rows > 0) {
  $popularRow = $popularResult->fetch_assoc();
  $mostPopularGenre = $popularRow['genre_name'];
} else {
  $mostPopularGenre = "N/A";
}

// === RECENT MOVIES ADDED ===
$recentMoviesQuery = "
    SELECT movie_id, title, poster_url, created_at
    FROM movies
    ORDER BY created_at DESC
    LIMIT 6
";

$recentMoviesResult = $conn->query($recentMoviesQuery);

?>


<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../../assets/styles/admin-dashboard.css">
  <link rel="icon" href="../../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../../assets/scripts/globals.js" defer></script>
  <script src="../../../assets/scripts/dashboard.js" defer></script>
  <title>FilmoPicks: Admin — Dashboard</title>
</head>

<body>
  <!-- Navigation bar -->
  <?php include "../../includes/header-admin.php"; ?>

  <div class="main-container">
    <!-- Sidebar -->
    <?php include "../../includes/sidebar-admin.php"; ?>

    <!-- Main Content -->
    <div class="main-content">
      <!-- Dashboard Content -->
      <div class="dashboard-content">
        <h1 class="dashboard-title">Dashboard</h1>
        <div class="dashboard-sections">
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-icon">📽️</div>
              <div class="stat-info">
                <span class="stat-label">Total Movies</span>
                <span class="stat-value"><?php echo $totalMovies; ?></span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-info">
                <span class="stat-label">Total Users</span>
                <span class="stat-value"><?php echo $totalUsers; ?></span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔥</div>
              <div class="stat-info">
                <span class="stat-label">Most Popular</span>
                <span class="stat-value"><?php echo $mostPopularGenre; ?></span>
              </div>
            </div>
          </div>
          <!-- Bottom Row - Recent Movies and Reviews -->
          <div class="bottom-section-grid">
            <!-- Recent Movies Added Section -->
            <div class="recent-movies-section">
              <h3 class="section-title">Recent Movies Added</h3>
              <div class="recent-movies-container">
                <div class="movies-table-header">
                  <div class="header-col poster-col">Poster</div>
                  <div class="header-col title-col">Title</div>
                  <div class="header-col date-col">Date Added</div>
                </div>
                <div class="movies-table-body">
                  <?php
                  while ($movie = $recentMoviesResult->fetch_assoc()) {
                    $poster = $movie['poster_url'] ? $movie['poster_url'] : '../../assets/images/default-poster.jpg';

                    $timestamp = strtotime($movie['created_at']);
                    $formattedDate = date("Y-m-d h:i A", $timestamp);
                  ?>
                    <div class="movie-row">
                      <div class="movie-col poster-col">
                        <img src="<?php echo $poster; ?>" alt="<?php echo htmlspecialchars($movie['title']); ?>" class="movie-poster">
                      </div>
                      <div class="movie-col title-col"><?php echo htmlspecialchars($movie['title']); ?></div>
                      <div class="movie-col date-col"><?php echo $formattedDate; ?></div>
                    </div>
                  <?php
                  }
                  ?>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>