<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../assets/styles/globals.css">
  <link rel="stylesheet" href="../assets/styles/movie-list.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="icon" href="../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../assets/scripts/globals.js" defer></script>
  <script src="../assets/scripts/movie-list.js" defer></script>
  <title>Movie Lists — FilmoPicks</title>
</head>
<body>
  <header>
    <nav class="navbar">
      <div class="header">
        <div class="logo">
          <a href="index.html"><img src="../assets/logo/FilmoPicks Large Logo (Dark).svg" alt="FilmoPicks Logo" class="logo-img"></a>
        </div>
        <div class="search-bar">
          <input type="text" id="searchInput" placeholder="Search Something...">
          <button id="searchBtn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg></button>
        </div>
        <div class="header-right">
          <div class="auth-links" id="authLinks">
        
          </div>
          <div class="menu-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4 a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4 a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
            <ul class="nav-dropdown-menu" id="navDropdown">
    
            </ul>
          </div>
        </div>
      </div>
      <ul class="nav-links">
        <li><a href="index.html">Home</a></li>
        <li><a href="movie-list.html?type=series">TV shows</a></li>
        <li><a href="movie-list.html?type=movie" class="active">Movies</a></li>
        <li><a href="index.html#newly-added">Newly Added</a></li>
        <li><a href="index.html#trending">Trending</a></li>
        <li class="dropdown">
          <a href="index.html#genre">Genre</a>
          <div class="dropdown-content genre-dropdown">
            <strong>TOP GENRES</strong>
            <ul id="genreList">
              <!-- Dynamically populated from database -->
            </ul>
          </div>
        </li>
        <!-- <li class="dropdown">
          <a href="#">Services</a>
          <div class="dropdown-content">
            <strong>SERVICES</strong>
            <ul id="serviceList">
              <li>Loading...</li>
            </ul>
          </div>
        </li> -->
      </ul>
    </nav>
  </header>

  <main>
    <div class="directory-path">
      <span><a href="index.html">Home</a></span> &gt; <span id="breadcrumb">Movies</span>
    </div>
    
    <section class="controls">
      <h1 class="page-title" id="pageTitle">Movie List</h1>
      <div class="right-controls">
        <div class="left-controls">
          <label for="sort">Sort by</label>
          <select id="sort" aria-label="Sort movies">
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
            <option value="az">A - Z</option>
            <option value="za">Z - A</option>
          </select>
        </div>
        <div class="view-icons">
          <a href="#grid" title="Grid view" class="icon active" id="gridViewBtn"><i class="fas fa-th"></i></a>
          <a href="#rows" title="Row view" class="icon" id="rowViewBtn"><i class="fas fa-list"></i></a>
        </div>
      </div>
    </section>

    <!-- GRID VIEW -->
    <div class="grid-view" id="grid">
      <section class="movie-grid" id="movieGrid" aria-label="Movie posters grid">
        <p style="text-align: center; grid-column: 1/-1;">Loading movies...</p>
      </section>

    </div>

    <!-- ROW VIEW -->
    <section id="rows" class="movie-list" style="display:none;" aria-label="Movie list table">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Poster</th>
              <th>Title</th>
              <th>Release Date</th>
              <th>Type</th>
              <th>Duration</th>
            </tr>
          </thead>
          <tbody id="movieTable">
            <tr><td colspan="5" style="text-align:center;">Loading movies...</td></tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>

  <footer>
    <p>&copy; 2025 FilmoPicks: Your Movie-TV Shows Recommendation | About | Privacy </p>
  </footer>

  
</body>
</html>
