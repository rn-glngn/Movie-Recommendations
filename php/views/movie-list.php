<?php include "../config/db.php"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../assets/styles/movie-list.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="icon" href="../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../assets/scripts/globals.js" defer></script>
  <script src="../../assets/scripts/movie-list.js" defer></script>
  <title>Movie Lists — FilmoPicks</title>
</head>
<body>

<header>
  <nav class="navbar">
    <?php include "../includes/header.php"; ?>
    <?php include "../includes/navbar.php"; ?>
  </nav>
</header>

<main>
  <div class="directory-path">
    <span><a href="index.php">Home</a></span> &gt; <span id="breadcrumb">Movies</span>
  </div>

  <section class="controls">
    <h1 class="page-title" id="pageTitle">Movie List</h1>
    <div class="right-controls">
      <div class="left-controls">
        <label for="sort">Sort by</label>
        <select id="sort">
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
          <option value="az">A - Z</option>
          <option value="za">Z - A</option>
        </select>
      </div>
      <div class="view-icons">
        <a href="#grid" class="icon active" id="gridViewBtn"><i class="fas fa-th"></i></a>
        <a href="#rows" class="icon" id="rowViewBtn"><i class="fas fa-list"></i></a>
      </div>
    </div>
  </section>

  <!-- GRID VIEW -->
  <div class="grid-view" id="grid">
    <section class="movie-grid" id="movieGrid"></section>
    <div class="grid-pagination" id="gridPagination"></div>
</div>

  <!-- ROW VIEW -->
  <section id="rows" class="movie-list">
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
        <tbody id="movieTableBody">
      </table>
    </div>
    <div class="pagination" id="tablePagination"></div>
  </section>

</main>

<?php include "../includes/footer.php"; ?>

</body>
</html>
