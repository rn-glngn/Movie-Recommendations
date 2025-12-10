<?php include "../config/db.php"; ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../assets/styles/home.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
  <link rel="icon" href="../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../assets/scripts/globals.js" defer></script>
  <script src="../../assets/scripts/home.js" defer></script>
  <title>FilmoPicks: Your Movie & TV Show Recommendations</title>
</head>

<body>
  <header>
    <nav class="navbar">
      <?php include "../includes/header.php"; ?>
      <?php include "../includes/navbar.php"; ?>
    </nav>
  </header>

  <div class="main-container">

    <!-- TRENDING NOW -->
    <div class="Trending-now-section" id="trending">
      <div class="section-header">TRENDING NOW</div>

      <?php
      // Fetch latest movie as trending
      $trendingSql = "SELECT * FROM movies ORDER BY created_at DESC LIMIT 1";
      $trendingResult = $conn->query($trendingSql);
      if ($trendingResult && $trendingResult->num_rows > 0) {
        $trending = $trendingResult->fetch_assoc();
      ?>
        <img class="bg-img" src="<?= htmlspecialchars($trending['background_url']) ?>" alt="<?= htmlspecialchars($trending['title']) ?>">
        <div class="trending-content">
          <div class="Titlemovie1"><?= htmlspecialchars($trending['title']) ?></div>
          <div class="Description"><?= htmlspecialchars($trending['description']) ?></div>
          <div class="actions">
            <button class="View-details"><a href="movie-details.php?id=<?= $trending['movie_id'] ?>">View Details</a></button>
            <button class="Watch-trailer">Watch Trailer</button>
          </div>
        </div>
      <?php } ?>

      <div class="poster-strip slider-container recommendations-grid" aria-hidden="false">
        <?php
        $posterSql = "SELECT * FROM movies ORDER BY created_at DESC LIMIT 3";
        $posterResult = $conn->query($posterSql);
        while ($movie = $posterResult->fetch_assoc()) {
          echo '<img class="poster-btn" data-movie="' . $movie['movie_id'] . '" src="' . htmlspecialchars($movie['poster_url']) . '" alt="' . htmlspecialchars($movie['title']) . '">';
        }
        ?>
      </div>
    </div>

    <!-- MOVIE ROULETTE -->
    <div class="movie-roulette" id="movies">
      <h2>Movie Roulette</h2>
      <p class="find-something">Use the randomizer below to find something to watch.</p>
      <div class="roulette-inner">
        <div class="roulette-controls">
          <label>GENRE
            <select id="genreSelect">
              <option value="any">All Genres</option>
              <?php
              $genreSql = "SELECT DISTINCT genre FROM movies ORDER BY genre ASC";
              $genreResult = $conn->query($genreSql);
              while ($row = $genreResult->fetch_assoc()) {
                echo '<option value="' . htmlspecialchars($row['genre']) . '">' . htmlspecialchars($row['genre']) . '</option>';
              }
              ?>
            </select>
          </label>
          <label>TYPE
            <div class="checkboxes">
              <label><input type="checkbox" id="typeMovies" checked> Movies</label>
              <label><input type="checkbox" id="typeSeries"> TV Shows/Series</label>
            </div>
          </label>
          <button id="spinBtn" class="spin-btn">Spin now</button>
        </div>
        <div class="roulette-result">
          <img id="roulettePoster" src="../../assets/images/arcane.jpg" alt="Poster">
          <div class="result-meta">
            <h3 id="resultTitle">Arcane</h3>
            <p id="resultInfo">2021 &nbsp; Rated SPG &nbsp; 2 Seasons</p>
            <p id="resultDesc" class="result-desc">In the cities of Piltover and Zaun...</p>
            <button class="View-details small"><a href="movie-details.html">View Details</a></button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- RECOMMENDED FOR YOU -->
  <div class="recommendations-section" id="home">
    <h2>RECOMMENDED FOR YOU</h2>
    <div class="slider-container">
      <button class="scroll-btn left">❮</button>
      <div class="recommendations-grid" id="recommendedGrid">
        <?php
        $recSql = "SELECT * FROM movies ORDER BY created_at DESC LIMIT 12";
        $recResult = $conn->query($recSql);
        while ($movie = $recResult->fetch_assoc()) {
          echo '<a href="movie-details.php?id=' . $movie['movie_id'] . '"><img src="' . htmlspecialchars($movie['poster_url']) . '" alt="' . htmlspecialchars($movie['title']) . '"></a>';
        }
        ?>
      </div>
      <button class="scroll-btn right">❯</button>
    </div>
  </div>

  <!-- NEWLY ADDED -->
  <div class="newly-added-section" id="newly-added">
    <h2>NEWLY ADDED</h2>
    <div class="slider-container">
      <button class="scroll-btn left">❮</button>
      <div class="recommendations-grid" id="newlyAddedGrid">
        <?php
        $newSql = "SELECT * FROM movies ORDER BY created_at DESC LIMIT 12";
        $newResult = $conn->query($newSql);
        while ($movie = $newResult->fetch_assoc()) {
          echo '<a href="movie-details.php?id=' . $movie['movie_id'] . '"><img src="' . htmlspecialchars($movie['poster_url']) . '" alt="' . htmlspecialchars($movie['title']) . '"></a>';
        }
        ?>
      </div>
      <button class="scroll-btn right">❯</button>
    </div>
  </div>

  <!-- BROWSE BY GENRE -->
  <div class="browse-by-genre-section" id="genre">
    <h2>BROWSE BY GENRE</h2>
    <div class="slider-container">
      <button class="scroll-btn left">❮</button>
      <div class="recommendations-grid" id="genreGrid">
        <?php
        $genreMoviesSql = "SELECT * FROM movies ORDER BY genre ASC LIMIT 12";
        $genreMoviesResult = $conn->query($genreMoviesSql);
        while ($movie = $genreMoviesResult->fetch_assoc()) {
          echo '<a href="movie-details.php?id=' . $movie['movie_id'] . '"><img src="' . htmlspecialchars($movie['poster_url']) . '" alt="' . htmlspecialchars($movie['title']) . '"></a>';
        }
        ?>
      </div>
      <button class="scroll-btn right">❯</button>
    </div>
  </div>

  </div>

  <?php include "../includes/footer.php"; ?>
  <script>
    const testEl = document.getElementById("movies");
    console.log("Roulette container exists:", testEl);
    if (testEl) testEl.style.border = "2px solid green";
  </script>

</body>

</html>