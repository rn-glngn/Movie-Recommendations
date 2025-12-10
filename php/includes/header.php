<?php
session_start();
?>

<header>
  <div class="header">
    <!-- LOGO -->
    <div class="logo">
      <a href="../views/index.php">
        <img src="../../assets/logo/FilmoPicks Large Logo (Dark).svg"
          alt="FilmoPicks Logo" class="logo-img">
      </a>
    </div>

    <!-- SEARCH BAR -->
    <div class="search-bar">
      <input type="text" placeholder="Search Something...">
      <button>
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>
    </div>

    <div class="header-right">
      <?php if (!isset($_SESSION['user_id'])): ?>
        <!-- GUEST MODE (Not Logged In) -->
        <div class="auth-links">
          <a href="../views/login.php">Login</a>
          <a href="../views/signup.php">Signup</a>
        </div>

      <?php else: ?>
        <!-- LOGGED-IN MODE (User) -->
        <!-- USER GREETING -->
        <div class="auth-links logged-in-user">
          <span class="greeting">Hello, <?= htmlspecialchars($_SESSION['username']) ?>!</span>
        </div>

        <!-- HAMBURGER MENU -->
        <div class="menu-icon">
          <i class="fa-solid fa-bars"></i>

          <ul class="nav-dropdown-menu">
            <li><a href="../views/profile.php">Profile</a></li>
            <li><a href="../views/profile.php#settings">Settings</a></li>

            <!-- ADMIN ONLY (+ USER OPTIONAL) -->
            <?php if ($_SESSION['role'] === 'admin'): ?>
              <li><a href="../views/admin/dashboard.php">Admin Dashboard</a></li>
            <?php endif; ?>

            <!-- REQUEST SUBMENU -->
            <li class="nav-submenu-parent">
              Request
              <ul class="nav-submenu">
                <li><a href="../views/forms/add-movie.php">Add Movie</a></li>
                <li><a href="../views/forms/edit-movie.php">Edit Movie</a></li>
                <li><a href="../views/forms/delete-movie.php">Delete Movie</a></li>
              </ul>
            </li>

            <li><a href="../views/about.php">About</a></li>

            <!-- LOGOUT -->
            <li>
              <a href="../views/logout.php"
                onclick="alert('LOGOUT. Redirecting to Homepage')">
                Logout
              </a>
            </li>
          </ul>
        </div>

      <?php endif; ?>
    </div>

  </div>
</header>