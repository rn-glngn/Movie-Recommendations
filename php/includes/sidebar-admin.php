<div class="sidebar">
    <nav class="nav-menu">
      <a href="../admin/dashboard.php" class="nav-item">Dashboard</a>

      <!-- Lists Dropdown -->
      <div class="nav-dropdown">
        <button class="nav-item dropdown-toggle" onclick="toggleDropdown()">
          Lists
          <span class="dropdown-arrow">▼</span>
        </button>
        <div class="dropdown-menu" id="listsDropdown">
          <a href="../admin/movies.php" class="dropdown-item">Movies</a>
          <a href="../admin/requests.php" class="dropdown-item">Requests</a>
          <a href="../admin/users.php" class="dropdown-item">Users</a>
        </div>
      </div>
    </nav>
  </div>