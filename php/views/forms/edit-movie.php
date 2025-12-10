<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../assets/styles/form.css">
  <link rel="icon" href="../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../assets/scripts/globals.js" defer></script>
  <title>Edit Movie Request — FilmoPicks: Your Movie TV Show Recommendations</title>
</head>

<body>
  <header>
    <nav class="navbar">
      <div class="header">
        <div class="logo">
          <a href="../../pages/index.html"><img src="../../assets/logo/FilmoPicks Large Logo (Dark).svg"
              alt="FilmoPicks Logo" class="logo-img"></a>
        </div>
        <div class="search-bar">
          <input type="text" placeholder="Search Something...">
          <button><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
              class="bi bi-search" viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg></button>
        </div>
        <div class="header-right">
          <div class="auth-links">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill"
              viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            <a href="#" onclick="alert('Login clicked'); return false;">Login</a>
            <span class="separator">|</span>
            <a href="login.html" onclick="alert('Sign Up Clicked'); return false;">Signup</a>
          </div>
          <div class="menu-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4
         a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4
         a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>

            <ul class="nav-dropdown-menu">
              <li><a href="../../pages/profile.html">Profile</a></li>
              <li><a href="../../pages/profile.html#settings">Settings</a></li>
              <li class="nav-submenu-parent">
                Request
                <ul class="nav-submenu">
                  <li><a href="../forms/add-movie.html">Add Movie</a></li>
                  <li><a href="../forms/edit-movie.html">Edit Movie</a></li>
                  <li><a href="../forms/delete-movie.html">Delete Movie</a></li>
                </ul>
              </li>
              <li><a href="../../pages/about.html">About</a></li>
              <li><a href="../../pages/index.html">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>

  <!-- Main Container -->
  <div class="main-container">
    <h1 class="page-header">Edit Movie Details</h1>

    <div class="form-container">
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
              <input type="text" placeholder="Movie Title">
            </div>
            <div class="form-group">
              <label>Type of Media</label>
              <select>
                <option>Movie</option>
                <option>TV Show</option>
              </select>
            </div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>Release Date</label>
              <input type="date">
            </div>
            <div class="form-group">
              <label>Length of Time</label>
              <input type="text" placeholder="1h 57m / 3 episodes">
            </div>
          </div>

          <div class="form-group full-width">
            <label>Trailer Link</label>
            <input type="url" placeholder="https://www.youtube.com/watch?v=abc123">
          </div>

          <div class="form-group full-width">
            <label>Streaming Platform</label>
            <select>
              <option>Netflix</option>
              <option>Disney+</option>
              <option>Amazon Prime</option>
              <option>HBO Max</option>
              <option>Hulu</option>
              <option>Apple TV+</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Genres Section -->
      <div class="section">
        <h2 class="section-title">Genres</h2>
        <div class="genres-grid">
          <div class="genre-item">
            <input type="checkbox" id="genre1">
            <label for="genre1">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre2">
            <label for="genre2">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre3">
            <label for="genre3">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre4">
            <label for="genre4">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre5">
            <label for="genre5">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre6">
            <label for="genre6">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre7">
            <label for="genre7">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre8">
            <label for="genre8">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre9">
            <label for="genre9">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre10">
            <label for="genre10">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre11">
            <label for="genre11">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre12">
            <label for="genre12">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre13">
            <label for="genre13">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre14">
            <label for="genre14">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre15">
            <label for="genre15">Genre Category</label>
          </div>
          <div class="genre-item">
            <input type="checkbox" id="genre16">
            <label for="genre16">Genre Category</label>
          </div>
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
        <textarea placeholder="Add text here..."></textarea>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button class="btn btn-cancel">Cancel</button>
        <button class="btn btn-save" onclick="alert('Edit Changes are Submitted to the Admins')">Submit Changes</button>
      </div>
    </div>
  </div>
</body>

</html>