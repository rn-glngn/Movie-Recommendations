<?php include "../../config/db.php";

$usersQuery = "
    SELECT user_id, fullname, username, role, created_at
    FROM users
    ORDER BY created_at DESC
";
$usersResult = $conn->query($usersQuery);

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../../assets/styles/admin-users.css">
  <link rel="icon" href="../../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../../assets/scripts/globals.js" defer></script>
  <script src="../../../assets/scripts/admin-users.js" defer></script>
  <title>FilmoPicks: Admin — Users List</title>
</head>

<body>
  <!-- Navigation bar -->
  <?php include "../../includes/header-admin.php"; ?>

  <div class="main-container">
    <!-- Sidebar -->
    <?php include "../../includes/sidebar-admin.php"; ?>

    <!-- Main Content -->
    <div class="main-content">
      <div class="user-list-container">
        <div class="title-section">
          <h1>Users List</h1>
        </div>
        <div class="tabs">
          <button class="tab active" data-tab="all">ALL</button>
          <button class="tab" data-tab="active">ACTIVE USERS</button>
          <button class="tab" data-tab="admins">ADMINS</button>
        </div>
        <div class="content-wrapper">
          <div class="controls">
            <div class="search-requests">
              <input type="text" id="searchInput" placeholder="Search requests...">
              <span class="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                  fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                  <path
                    d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg></span>
            </div>
            <div class="sort-section">
              <div class="sort-label">
                <div class="sort-arrows">
                  <div class="arrow arrow-up"></div>
                  <div class="arrow arrow-down"></div>
                </div>
                <span>Sort by:</span>
              </div>
              <div class="sort-dropdown">
                <select class="sort-select" id="sortSelect">
                  <option value="earliest">Earliest</option>
                  <option value="oldest">Oldest</option>
                  <option value="az">A-Z</option>
                  <option value="za">Z-A</option>
                </select>
                <div class="dropdown-arrow"></div>
              </div>
            </div>
          </div>
          <div class="users-grid" id="usersGrid">
            <?php
            if ($usersResult && $usersResult->num_rows > 0) {
              while ($user = $usersResult->fetch_assoc()) {
                $fullname = htmlspecialchars($user['fullname']);
                $username = htmlspecialchars($user['username']);
                $role = htmlspecialchars($user['role']);
                $timestamp = strtotime($user['created_at']);
                $formattedDate = date("Y-m-d h:i A", $timestamp);

                echo '<div class="user-card" data-name="' . $fullname . '" data-username="@' . $username . '" data-date="' . $formattedDate . '" data-type="' . $role . '" data-status="active">';
                echo '  <div class="user-avatar">👤</div>';
                echo '  <div class="user-info">';
                echo '    <div class="user-name">' . $fullname . '</div>';
                echo '    <div class="user-username">@' . $username . '</div>';
                echo '  </div>';
                echo '</div>';
              }
            } else {
              echo '<div class="no-results">No users found</div>';
            }
            ?>
          </div>
          <div class="no-results" id="noResults" style="display: none;">No results found</div>
        </div>
      </div>
    </div>
  </div>
</body>

</html>