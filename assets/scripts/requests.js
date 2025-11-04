// ─── Navigation Dropdown Initialization ─────────────
function initDropdown() {
  const dropdown = document.getElementById("listsDropdown");
  const arrow = document.querySelector(".dropdown-arrow");

  if (!dropdown || !arrow) return;

  dropdown.style.display = "block";
  arrow.textContent = "▲";

  window.toggleDropdown = function () {
    if (dropdown.style.display === "block") {
      dropdown.style.display = "none";
      arrow.textContent = "▼";
    } else {
      dropdown.style.display = "block";
      arrow.textContent = "▲";
    }
  };
}

// ─── Sample Data ───────────────────────────
const requests = [
  {
    id: 1,
    title: "The Fragrant Flower Blooms With Dignity",
    submittedBy: "juan_dc",
    requestType: "Add",
    dateSubmitted: "01/01/2025",
    timestamp: new Date("2025-01-01").getTime(),
    status: "approved",
    thumbnail: "../../assets/images/FlagrantFLowerBloomsWithDignityPoster.webp",
  },
  {
    id: 2,
    title: "Wednesday",
    submittedBy: "juan_dc",
    requestType: "Edit",
    dateSubmitted: "12/18/2024",
    timestamp: new Date("2024-12-18").getTime(),
    status: "pending",
    thumbnail: "../../assets/images/WednesdayPoster.jpg",
  },
  {
    id: 3,
    title: "Breaking Bad",
    submittedBy: "juan_dc",
    requestType: "Delete",
    dateSubmitted: "11/13/2024",
    timestamp: new Date("2024-11-13").getTime(),
    status: "rejected",
    thumbnail: "../../assets/images/BreakingBadPoster.jpg",
  },
  {
    id: 4,
    title: "Dan Da Dan",
    submittedBy: "user1234",
    requestType: "Edit",
    dateSubmitted: "10/25/2024",
    timestamp: new Date("2024-10-25").getTime(),
    status: "pending",
    thumbnail: "../../assets/images/DandadanPoster.jpg",
  },
  {
    id: 5,
    title: "Moana",
    submittedBy: "eme_eme",
    requestType: "Delete",
    dateSubmitted: "09/01/2024",
    timestamp: new Date("2024-09-01").getTime(),
    status: "pending",
    thumbnail: "../../assets/images/MoanaPoster.webp",
  },
  {
    id: 6,
    title: "Dr. Stone",
    submittedBy: "secret456",
    requestType: "Add",
    dateSubmitted: "07/01/2024",
    timestamp: new Date("2024-07-01").getTime(),
    status: "approved",
    thumbnail: "../../assets/images/Dr.StonePoster.webp",
  },
];

let currentTab = "all";
let currentView = "list";
let currentSort = "earliest";
let searchQuery = "";

// ─── Tabs ───────────────────────────────
document.querySelectorAll(".tab").forEach((tab) => {
  tab.addEventListener("click", () => {
    document
      .querySelectorAll(".tab")
      .forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    currentTab = tab.dataset.tab;
    renderRequests();
  });
});

// ─── View Toggle ────────────────────────
document.getElementById("gridViewBtn").addEventListener("click", () => {
  currentView = "grid";
  document.getElementById("gridViewBtn").classList.add("active");
  document.getElementById("listViewBtn").classList.remove("active");
  renderRequests();
});

document.getElementById("listViewBtn").addEventListener("click", () => {
  currentView = "list";
  document.getElementById("listViewBtn").classList.add("active");
  document.getElementById("gridViewBtn").classList.remove("active");
  renderRequests();
});

// ─── Sorting ────────────────────────────
document.getElementById("sortButton").addEventListener("click", () => {
  document.getElementById("dropdownMenu").classList.toggle("show");
});

document.querySelectorAll(".dropdown-item").forEach((item) => {
  item.addEventListener("click", () => {
    currentSort = item.dataset.sort;
    document.getElementById("sortButton").textContent = item.textContent;
    document.getElementById("dropdownMenu").classList.remove("show");
    renderRequests();
  });
});

// ─── Search ─────────────────────────────
document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value.toLowerCase();
  renderRequests();
});

// ─── Close Dropdown When Clicking Outside ─
window.addEventListener("click", (e) => {
  if (!e.target.matches(".sort-button")) {
    document.getElementById("dropdownMenu").classList.remove("show");
  }
});

// ─── Filter + Sort ───────────────────────
function filterAndSortRequests() {
  let filtered = requests.filter((req) => {
    const matchesTab = currentTab === "all" || req.status === currentTab;
    const matchesSearch =
      searchQuery === "" ||
      req.title.toLowerCase().includes(searchQuery) ||
      req.submittedBy.toLowerCase().includes(searchQuery) ||
      req.requestType.toLowerCase().includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  filtered.sort((a, b) => {
    if (currentSort === "earliest") return a.timestamp - b.timestamp;
    return b.timestamp - a.timestamp;
  });

  return filtered;
}

// ─── Render Logic ────────────────────────
function renderRequests() {
  const data = filterAndSortRequests();

  document.getElementById("listView").classList.add("hidden");
  document.getElementById("gridView").classList.add("hidden");
  document.getElementById("pendingView").classList.add("hidden");
  document.getElementById("bulkActions").classList.add("hidden");

  if (currentTab === "pending") {
    document.getElementById("bulkActions").classList.remove("hidden");
  }

  if (currentTab === "pending" && currentView === "grid") {
    renderPendingView(data);
  } else if (currentView === "list") {
    renderListView(data);
  } else {
    renderGridView(data);
  }
}

// ─── List View ───────────────────────────
function renderListView(data) {
  document.getElementById("listView").classList.remove("hidden");
  const list = document.getElementById("requestList");

  if (data.length === 0) {
    list.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--color-text-secondary);">
                No requests found
            </div>`;
    return;
  }

  list.innerHTML = data
    .map(
      (req) => `
        <div class="request-item">
            <img src="${req.thumbnail}" alt="${req.title}" class="thumbnail">
            <div>${req.title}</div>
            <div>${req.submittedBy}</div>
            <div>${req.requestType}</div>
            <div>${req.dateSubmitted}</div>
            <div class="status-cell">
                ${
                  currentTab === "pending" && req.status === "pending"
                    ? `
                        <div class="status-actions">
                            <button class="action-btn approve-btn" data-id="${req.id}">Approve</button>
                            <button class="action-btn reject-btn" data-id="${req.id}">Reject</button>
                        </div>
                      `
                    : `
                        <span class="status-badge status-${req.status}">
                            ${
                              req.status.charAt(0).toUpperCase() +
                              req.status.slice(1)
                            }
                        </span>
                      `
                }
            </div>
        </div>
    `
    )
    .join("");

  // Approve/Reject actions
  document.querySelectorAll(".approve-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const req = requests.find((r) => r.id === id);
      if (req) req.status = "approved";
      renderRequests();
    });
  });

  document.querySelectorAll(".reject-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = parseInt(e.target.dataset.id);
      const req = requests.find((r) => r.id === id);
      if (req) req.status = "rejected";
      renderRequests();
    });
  });
}

// ─── Grid View ───────────────────────────
function renderGridView(data) {
  document.getElementById("gridView").classList.remove("hidden");
  const grid = document.getElementById("gridView");

  if (data.length === 0) {
    grid.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--color-text-secondary); grid-column: 1 / -1;">
                No requests found
            </div>`;
    return;
  }

  grid.innerHTML = data
    .map(
      (req) => `
        <div class="grid-item">
            <img src="${req.thumbnail}" alt="${
        req.title
      }" class="grid-thumbnail">
            <div class="grid-info">
                <div><strong>Title:</strong> ${req.title}</div>
                <div><strong>Submitted By:</strong> ${req.submittedBy}</div>
                <div><strong>Request Type:</strong> ${req.requestType}</div>
                <div><strong>Date Submitted:</strong> ${req.dateSubmitted}</div>
                <div><strong>Status:</strong> 
                    <span class="status-badge status-${req.status}">
                        ${
                          req.status.charAt(0).toUpperCase() +
                          req.status.slice(1)
                        }
                    </span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// ─── Pending Grid ────────────────────────
function renderPendingView(data) {
  document.getElementById("pendingView").classList.remove("hidden");
  document.getElementById("bulkActions").classList.remove("hidden");
  const grid = document.getElementById("pendingView");

  if (data.length === 0) {
    grid.innerHTML = `
            <div style="text-align: center; padding: 2rem; color: var(--color-text-secondary); grid-column: 1 / -1;">
                No pending requests found
            </div>`;
    document.getElementById("bulkActions").classList.add("hidden");
    return;
  }

  grid.innerHTML = data
    .map(
      (req) => `
        <div class="pending-item">
            <img src="${req.thumbnail}" alt="${req.title}" class="pending-thumbnail">
            <div class="pending-info">
                <div><strong>Title:</strong> ${req.title}</div>
                <div><strong>Submitted By:</strong> ${req.submittedBy}</div>
                <div><strong>Request Type:</strong> ${req.requestType}</div>
                <div><strong>Date Submitted:</strong> ${req.dateSubmitted}</div>
                <div><strong>Status:</strong> Pending</div>
                <div class="action-buttons">
                    <button class="action-btn approve-btn" data-id="${req.id}">Approve</button>
                    <button class="action-btn reject-btn" data-id="${req.id}">Reject</button>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

// ─── Initial Render ──────────────────────
renderRequests();
