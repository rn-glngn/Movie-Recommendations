<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../assets/styles/admin-dashboard.css">
  <link rel="icon" href="../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../assets/scripts/globals.js" defer></script>
  <script src="../../assets/scripts/dashboard.js" defer></script>
  <title>FilmoPicks: Admin — Dashboard</title>
</head>

<body>
  <!-- Navigation bar -->
  <div class="header">
    <div class="logo">
      <img src="../../assets/logo/FilmoPicks Large Logo (Dark).svg" alt="FilmoPicks Logo" class="logo-img">
    </div>
    <div class="user-section">
      <div class="notification">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell-fill"
          viewBox="0 0 16 16">
          <path
            d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2m.995-14.901a1 1 0 1 0-1.99 0A5 5 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901" />
        </svg>
      </div>
      <span class="admin-text">Admin</span>
      <div class="avatar menu-icon">
        <ul class="nav-dropdown-menu">
          <li><a href="../index.html">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>

  <div class="main-container">
    <!-- Sidebar -->
    <div class="sidebar">
      <nav class="nav-menu">
        <a href="#" class="nav-item active">Dashboard</a>

        <!-- Lists Dropdown -->
        <div class="nav-dropdown">
          <button class="nav-item dropdown-toggle" onclick="toggleDropdown()">
            Lists
            <span class="dropdown-arrow">▼</span>
          </button>
          <div class="dropdown-menu" id="listsDropdown">
            <a href="../admin/movies.html" class="dropdown-item">Movies</a>
            <a href="../admin/requests.html" class="dropdown-item">Requests</a>
            <a href="../admin/users.html" class="dropdown-item">Users</a>
          </div>
        </div>
      </nav>
    </div>

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
                <span class="stat-value">500</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">👥</div>
              <div class="stat-info">
                <span class="stat-label">Total Users</span>
                <span class="stat-value">1,345</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">⭐</div>
              <div class="stat-info">
                <span class="stat-label">Average Rating</span>
                <span class="stat-value">4.5</span>
              </div>
            </div>
            <div class="stat-card">
              <div class="stat-icon">🔥</div>
              <div class="stat-info">
                <span class="stat-label">Most Popular</span>
                <span class="stat-value">Action</span>
              </div>
            </div>
          </div>
          <!-- Second Row - Analytics Cards -->
          <div class="analytics-grid">
            <div class="stat-card-2nd">
              <h3 class="card-title">Top Rated Genres</h3>
              <div class="genre-list">
                <div class="genre-item">
                  <div class="genre-info">
                    <span class="genre-name">Action</span>
                    <span class="genre-rating">4.5</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 90%"></div>
                  </div>
                </div>
                <div class="genre-item">
                  <div class="genre-info">
                    <span class="genre-name">Comedy</span>
                    <span class="genre-rating">4.1</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 82%"></div>
                  </div>
                </div>
                <div class="genre-item">
                  <div class="genre-info">
                    <span class="genre-name">Drama</span>
                    <span class="genre-rating">3.9</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 78%"></div>
                  </div>
                </div>
                <div class="genre-item">
                  <div class="genre-info">
                    <span class="genre-name">Sci-Fi</span>
                    <span class="genre-rating">3.6</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill" style="width: 72%"></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="stat-card-2nd">
              <h3 class="card-title">User Activity</h3>
              <div class="image-container">
                <img src="../../assets/images/user-activity image.png" alt="User Activity Chart">
              </div>
            </div>
            <div class="stat-card-2nd">
              <h3 class="card-title">Requested Movies</h3>
              <div class="image-container">
                <img src="../../assets/images/approve-reject image.png" alt="Requested Movies Chart">
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
                  <div class="header-col rating-col">Rating</div>
                </div>
                <div class="movies-table-body">
                  <div class="movie-row">
                    <div class="movie-col poster-col">
                      <img src="../../assets/images/Joker Poster.jpeg" alt="Joker" class="movie-poster">
                    </div>
                    <div class="movie-col title-col">Joker</div>
                    <div class="movie-col date-col">2025-09-14</div>
                    <div class="movie-col rating-col">4.5</div>
                  </div>
                  <div class="movie-row">
                    <div class="movie-col poster-col">
                      <img src="../../assets/images/Dandadan.avif" alt="Dan Da Dan" class="movie-poster">
                    </div>
                    <div class="movie-col title-col">Dan Da Dan</div>
                    <div class="movie-col date-col">2025-08-02</div>
                    <div class="movie-col rating-col">4.1</div>
                  </div>
                  <div class="movie-row">
                    <div class="movie-col poster-col">
                      <img src="../../assets/images/Breaking-Bad.jpg" alt="Breaking Bad" class="movie-poster">
                    </div>
                    <div class="movie-col title-col">Breaking Bad</div>
                    <div class="movie-col date-col">2025-04-23</div>
                    <div class="movie-col rating-col">4.0</div>
                  </div>
                  <div class="movie-row">
                    <div class="movie-col poster-col">
                      <img src="../../assets/images/Divergent.jpg" alt="Divergent" class="movie-poster">
                    </div>
                    <div class="movie-col title-col">Divergent</div>
                    <div class="movie-col date-col">2025-04-23</div>
                    <div class="movie-col rating-col">4.0</div>
                  </div>
                  <div class="movie-row">
                    <div class="movie-col poster-col">
                      <img src="../../assets/images/The Hunger Games.webp" alt="The Hunger Games" class="movie-poster">
                    </div>
                    <div class="movie-col title-col">The Hunger Games</div>
                    <div class="movie-col date-col">2025-03-15</div>
                    <div class="movie-col rating-col">4.2</div>
                  </div>
                  <div class="movie-row">
                    <div class="movie-col poster-col">
                      <img src="../../assets/images/Suits.jfif" alt="Suits" class="movie-poster">
                    </div>
                    <div class="movie-col title-col">Suits</div>
                    <div class="movie-col date-col">2025-02-10</div>
                    <div class="movie-col rating-col">4.3</div>
                  </div>
                </div>
              </div>
            </div>
            <!-- Recent Reviews Section -->
            <div class="recent-reviews-section">
              <h3 class="section-title">Recent Reviews</h3>
              <div class="recent-reviews-container">
                <div class="reviews-table-header">
                  <div class="header-col user-col">User</div>
                  <div class="header-col movie-col">Movie</div>
                  <div class="header-col rating-col">Rating</div>
                  <div class="header-col comment-col">Comment</div>
                  <div class="header-col date-col">Date</div>
                </div>
                <div class="reviews-table-body">
                  <div class="review-row">
                    <div class="review-col user-col">juan_dc</div>
                    <div class="review-col movie-col">Joker</div>
                    <div class="review-col rating-col">4.5</div>
                    <div class="review-col comment-col">Great movie h...</div>
                    <div class="review-col date-col">2025-09-14</div>
                  </div>
                  <div class="review-row">
                    <div class="review-col user-col">juan_dc</div>
                    <div class="review-col movie-col">Dan Da Dan</div>
                    <div class="review-col rating-col">4.1</div>
                    <div class="review-col comment-col">Great movie h...</div>
                    <div class="review-col date-col">2025-08-02</div>
                  </div>
                  <div class="review-row">
                    <div class="review-col user-col">juan_dc</div>
                    <div class="review-col movie-col">Breaking Bad</div>
                    <div class="review-col rating-col">4.0</div>
                    <div class="review-col comment-col">Great movie h...</div>
                    <div class="review-col date-col">2025-04-23</div>
                  </div>
                  <div class="review-row">
                    <div class="review-col user-col">juan_dc</div>
                    <div class="review-col movie-col">Divergent</div>
                    <div class="review-col rating-col">4.0</div>
                    <div class="review-col comment-col">Great movie h...</div>
                    <div class="review-col date-col">2025-04-23</div>
                  </div>
                  <div class="review-row">
                    <div class="review-col user-col">juan_dc</div>
                    <div class="review-col movie-col">The Hunger Games</div>
                    <div class="review-col rating-col">4.2</div>
                    <div class="review-col comment-col">Great movie h...</div>
                    <div class="review-col date-col">2025-03-15</div>
                  </div>
                  <div class="review-row">
                    <div class="review-col user-col">juan_dc</div>
                    <div class="review-col movie-col">Suits</div>
                    <div class="review-col rating-col">4.3</div>
                    <div class="review-col comment-col">Great movie h...</div>
                    <div class="review-col date-col">2025-02-10</div>
                  </div>
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