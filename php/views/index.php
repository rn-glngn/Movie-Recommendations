<?php include "../config/db.php"; ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../assets/styles/home.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
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
    <div class="Trending-now-section" id="trending">
      <div class="section-header">TRENDING NOW</div>
      <img class="bg-img" src="../../assets/images/Alice-In-Borderland.jpg" alt="Alice In Borderland">
      <div class="trending-content">
        <div class="Titlemovie1">Alice In Borderland</div>
        <div class="Rating">8.6/10</div>
        <div class="Description">Arisu - a listless, jobless and video-game-obsessed young man - suddenly finds
          himself in a strange, emptied-out version of Tokyo in which he and his friends must compete in
          dangerous games in order to survive.</div>
        <div class="actions">
          <button class="View-details"><a href="movie-details.html">View Details</a></button>
          <button class="Watch-trailer">Watch Trailer</button>
        </div>
      </div>
      <div class="poster-strip slider-container recommendations-grid" aria-hidden="false">
        <img class="poster-btn" data-movie="1" src="../../assets/images/the-fragrant-flower-blooms-with-dignity.jpg"
          alt="The Fragrant Flower">
        <img class="poster-btn" data-movie="2" src="../../assets/images/wednesdayshow.jpg" alt="Wednesday">
        <img class="poster-btn" data-movie="3" src="../../assets/images/breaking-bad-poster.jpg" alt="Breaking Bad">
      </div>
    </div>
    <div class="movie-roulette" id="movies">
      <h2>Movie Roulette</h2>
      <p class="find-something">Use the randomizer below to find something to watch.</p>
      <div class="roulette-inner">
        <div class="roulette-controls">
          <label>GENRE
            <select id="genreSelect">
              <option value="any">All Genres</option>
              <option value="animation">Animation</option>
              <option value="drama">Drama</option>
              <option value="action">Action</option>
            </select>
          </label>
          <label>TYPE
            <div class="checkboxes">
              <label><input type="checkbox" id="typeMovies" checked> Movies</label>
              <label><input type="checkbox" id="typeSeries"> TV Shows/Series</label>
            </div>
          </label>
          <label>MOVIE SCORE
            <select id="scoreSelect">
              <option value="any">Any Score</option>
              <option value="8">8+</option>
              <option value="7">7+</option>
            </select>
          </label>
          <button id="spinBtn" class="spin-btn">Spin now</button>
        </div>
        <div class="roulette-result">
          <img id="roulettePoster" src="../../assets/images/arcane.jpg" alt="Poster">
          <div class="result-meta">
            <h3 id="resultTitle">Arcane</h3>
            <p id="resultInfo">2021 &nbsp; Rated SPG &nbsp; 2 Seasons</p>
            <p id="resultDesc" class="result-desc">In the cities of Piltover and Zaun, tensions rise as
              inventors, hooligans, politicians, and crime lords grow increasingly dissatisfied with the
              constraints of a devastated ...</p>
            <button class="View-details small"><a href="movie-details.html">View Details</a></button>
          </div>
        </div>
      </div>
    </div>
    <div class="recommendations-section" id="home">
      <h2>RECOMMENDED FOR YOU</h2>
      <div class="slider-container">
        <button class="scroll-btn left">❮</button>
        <div class="recommendations-grid">
          <img src="../../assets/images/the-fragrant-flower-blooms-with-dignity.jpg" alt="The Fragrant Flower">
          <img src="../../assets/images/wednesdayshow.jpg" alt="Wednesday">
          <img src="../../assets/images/breaking-bad-poster.jpg" alt="Breaking Bad">
          <img src="../../assets/images/dandadan-2024.avif" alt="Dandadan">
          <img src="../../assets/images/Weapons-2025-horror-movie-review.jpg" alt="Weapons">
          <img src="../../assets/images/scott.jpg" alt="Scott">
          <img src="../../assets/images/joker.jpg" alt="Joker">
          <img src="../../assets/images/interstellar.jpg" alt="Interstellar">
          <img src="../../assets/images/dr.stone.jpg" alt="Dr Stone">
          <img src="../../assets/images/moana.jpg" alt="Moana">
          <img src="../../assets/images/kpopdemon.jpg" alt="Kpop">
          <img src="../../assets/images/thehows.jpg" alt="The Hows">
        </div>
        <button class="scroll-btn right">❯</button>
      </div>
    </div>
    <div class="newly-added-section" id="newly-added">
      <h2>NEWLY ADDED</h2>
      <div class="slider-container">
        <button class="scroll-btn left">❮</button>
        <div class="recommendations-grid">
          <img src="../../assets/images/the-fragrant-flower-blooms-with-dignity.jpg" alt="The Fragrant Flower">
          <img src="../../assets/images/wednesdayshow.jpg" alt="Wednesday">
          <img src="../../assets/images/breaking-bad-poster.jpg" alt="Breaking Bad">
          <img src="../../assets/images/dandadan-2024.avif" alt="Dandadan">
          <img src="../../assets/images/Weapons-2025-horror-movie-review.jpg" alt="Weapons">
          <img src="../../assets/images/scott.jpg" alt="Scott">
          <img src="../../assets/images/joker.jpg" alt="Joker">
          <img src="../../assets/images/interstellar.jpg" alt="Interstellar">
          <img src="../../assets/images/dr.stone.jpg" alt="Dr Stone">
          <img src="../../assets/images/moana.jpg" alt="Moana">
          <img src="../../assets/images/kpopdemon.jpg" alt="Kpop">
          <img src="../../assets/images/thehows.jpg" alt="The Hows">
        </div>
        <button class="scroll-btn right">❯</button>
      </div>
    </div>
    <div class="browse-by-genre-section" id="genre">
      <h2>BROWSE BY GENRE</h2>
      <div class="slider-container">
        <button class="scroll-btn left">❮</button>
        <div class="recommendations-grid">
          <img src="../../assets/images/the-fragrant-flower-blooms-with-dignity.jpg" alt="The Fragrant Flower">
          <img src="../../assets/images/wednesdayshow.jpg" alt="Wednesday">
          <img src="../../assets/images/breaking-bad-poster.jpg" alt="Breaking Bad">
          <img src="../../assets/images/dandadan-2024.avif" alt="Dandadan">
          <img src="../../assets/images/Weapons-2025-horror-movie-review.jpg" alt="Weapons">
          <img src="../../assets/images/scott.jpg" alt="Scott">
          <img src="../../assets/images/joker.jpg" alt="Joker">
          <img src="../../assets/images/interstellar.jpg" alt="Interstellar">
          <img src="../../assets/images/dr.stone.jpg" alt="Dr Stone">
          <img src="../../assets/images/moana.jpg" alt="Moana">
          <img src="../../assets/images/kpopdemon.jpg" alt="Kpop">
          <img src="../../assets/images/thehows.jpg" alt="The Hows">
        </div>
        <button class="scroll-btn right">❯</button>
      </div>
    </div>
  </div>
  <?php include "../includes/footer.php"; ?>
</body>

</html>
