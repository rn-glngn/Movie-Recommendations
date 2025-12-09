<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../assets/styles/globals.css">
  <link rel="stylesheet" href="../assets/styles/home.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
  <link rel="icon" href="../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../assets/scripts/globals.js" defer></script>
  <script src="../assets/scripts/home.js" defer></script>
  <title>FilmoPicks: Your Movie & TV Show Recommendations</title>
</head>

<body>
  <header>
    <div class="header">
      <div class="logo">
        <a href="../pages/index.html"><img src="..\assets\logo\FilmoPicks Large Logo (Dark).svg" alt="FilmoPicks Logo"
            class="logo-img"></a>
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
          <a href="../pages/login.html">Login</a>
          <a href="../pages/signup.html">Signup</a>
        </div>
        <div class="menu-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-list"
            viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4
        a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4
        a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
          </svg>

          <ul class="nav-dropdown-menu">
            <li><a href="../pages/profile.html">Profile</a></li>
            <li><a href="../pages/profile.html#settings">Settings</a></li>
            <li class="nav-submenu-parent">
              Request
              <ul class="nav-submenu">
                <li><a href="../pages/forms/add-movie.html">Add Movie</a></li>
                <li><a href="../pages/forms/edit-movie.html">Edit Movie</a></li>
                <li><a href="../pages/forms/delete-movie.html">Delete Movie</a></li>
              </ul>
            </li>
            <li><a href="../pages/about.html">About</a></li>
            <li><a href="../pages/index.html" onclick="alert('LOGOUT. Redirecting to Homepage')">Logout</a></li>
          </ul>
        </div>
      </div>
    </div>
  </header>