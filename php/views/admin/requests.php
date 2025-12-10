<?php include "../../config/db.php"; ?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="../../../assets/styles/globals.css">
  <link rel="stylesheet" href="../../../assets/styles/admin-requests.css">
  <link rel="icon" href="../../../assets/logo/FilmoPicks Small Logo.svg" type="image/svg+xml">
  <script src="../../../assets/scripts/globals.js" defer></script>
  <script src="../../../assets/scripts/requests.js" defer></script>
  <title>FilmoPicks: Admin — Request List</title>
</head>

<body>
  <!-- Navigation bar -->
  <?php include "../../includes/header-admin.php"; ?>

  <div class="main-container">
    <!-- Sidebar -->
    <?php include "../../includes/sidebar-admin.php"; ?>

    <!-- Main Content -->
    <div class="main-content">
      <div class="request-container">
        <h1>Request List</h1>
        <!-- Tabs -->
        <div class="tabs">
          <button class="tab active" data-tab="all">ALL</button>
          <button class="tab" data-tab="pending">PENDING</button>
          <button class="tab" data-tab="approved">APPROVED</button>
          <button class="tab" data-tab="rejected">REJECTED</button>
        </div>
        <!-- Unified Section: Control Panel + Content -->
        <div class="unified-section">
          <!-- Control Panel -->
          <div class="control-panel">
            <!-- Search and Sort -->
            <div class="search-sort-section">
              <div class="search-requests">
                <input type="text" placeholder="Search requests..." id="searchInput">
                <span class="search-icon"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                    fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                    <path
                      d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                  </svg></span>
              </div>
              <div class="controls-right">
                <div class="sort-section">
                  <div class="sort-arrows">
                    <div class="arrow arrow-up"></div>
                    <div class="arrow arrow-down"></div>
                  </div>
                  <span>Sort by:</span>
                  <div class="sort-dropdown">
                    <button class="sort-button" id="sortButton">Earliest</button>
                    <div class="dropdown-menu" id="dropdownMenu">
                      <div class="dropdown-item" data-sort="earliest">Earliest</div>
                      <div class="dropdown-item" data-sort="latest">Latest</div>
                    </div>
                  </div>
                </div>
                <div class="view-toggle">
                  <button class="view-btn" id="gridViewBtn">⊞</button>
                  <button class="view-btn active" id="listViewBtn">☰</button>
                </div>
              </div>
            </div>
          </div>
          <!-- Content Area -->
          <div class="content-area">
            <!-- List View -->
            <div id="listView">
              <div class="table-header">
                <div>Poster</div>
                <div>Title</div>
                <div>Submitted by</div>
                <div>Request Type</div>
                <div>Date Submitted</div>
                <div>Status</div>
              </div>
              <div id="requestList"></div>
            </div>
            <!-- Grid View -->
            <div id="gridView" class="grid-view hidden"></div>
            <!-- Pending View with Actions -->
            <div id="pendingView" class="pending-grid hidden"></div>
          </div>
        </div>
        <div class="bulk-actions hidden" id="bulkActions">
          <button class="bulk-btn approve-all-btn">APPROVE ALL</button>
          <button class="bulk-btn reject-all-btn">REJECT ALL</button>
        </div>
      </div>
    </div>
</body>

</html>