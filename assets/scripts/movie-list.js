let ALL_MOVIES = [];

// ---------- Fetch Movies ----------
async function getAllMovies() {
  if (ALL_MOVIES.length) return ALL_MOVIES;

  const res = await fetch("../modules/fetch-movies.php");
  const data = await res.json();

  ALL_MOVIES = Array.isArray(data) ? data : [];
  return ALL_MOVIES;
}

// ---------- Movie List Page ----------
document.addEventListener("DOMContentLoaded", async () => {
  const movies = await getAllMovies();
  console.log("Loaded movies:", movies);

  if (!movies.length) return;

  const moviesPerPage = 12;
  let currentPage = 1;
  const sortSelect = document.getElementById("sort");

  if (!location.hash) {
    location.hash = "grid";
  }

  // ---------- Formatting Helpers ----------
  function safe(val, fallback = "N/A") {
    return val ?? fallback;
  }

  function formatDate(dateStr) {
    if (!dateStr) return "N/A";

    const date = new Date(dateStr);
    if (isNaN(date)) return "N/A";

    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  function capitalize(str) {
    return str ? str[0].toUpperCase() + str.slice(1) : "";
  }

  function formatDuration(minutes) {
    if (!minutes || isNaN(minutes)) return "";

    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;

    if (hrs && mins) return `${hrs}hr ${mins} min`;
    if (hrs) return `${hrs}hr`;
    return `${mins} min`;
  }

  function getFilteredMovies() {
    let filtered = [...movies];

    // Type filter
    filtered = filtered.filter(
      (m) =>
        (typeMovieCheckbox?.checked && m.type === "movie") ||
        (typeSeriesCheckbox?.checked && m.type === "series")
    );

    // Genre filter
    if (genreSelect && genreSelect.value !== "any") {
      filtered = filtered.filter((m) => m.genre === genreSelect.value);
    }

    // Sorting
    if (sortSelect) {
      const sortVal = sortSelect.value;
      filtered.sort((a, b) => {
        if (sortVal === "latest")
          return new Date(b.created_at) - new Date(a.created_at);
        if (sortVal === "oldest")
          return new Date(a.created_at) - new Date(b.created_at);
        if (sortVal === "az") return a.title.localeCompare(b.title);
        if (sortVal === "za") return b.title.localeCompare(a.title);
        return 0;
      });
    }

    return filtered;
  }

  // ---------- Sorting ----------
  function getSortedMovies() {
    const sorted = [...movies];
    if (sortSelect) {
      const val = sortSelect.value;
      sorted.sort((a, b) => {
        switch (val) {
          case "latest":
            // Sort by release_date descending
            return new Date(b.release_date) - new Date(a.release_date);
          case "oldest":
            // Sort by release_date ascending
            return new Date(a.release_date) - new Date(b.release_date);
          case "az":
            return (a.title ?? "").localeCompare(b.title ?? "");
          case "za":
            return (b.title ?? "").localeCompare(a.title ?? "");
        }
        return 0;
      });
    }
    return sorted;
  }

  // ===== PAGINATION =====
  function goToPage(page) {
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    if (page < 1 || page > totalPages) return;

    currentPage = page;
    renderGrid(currentPage);
    renderTable(currentPage);
  }

  // ===== GRID VIEW =====
  function renderGrid(page = 1) {
    const movieGrid = document.getElementById("movieGrid");
    if (!movieGrid) return;

    const start = (page - 1) * moviesPerPage;
    const paginated = movies.slice(start, start + moviesPerPage);

    movieGrid.innerHTML = paginated
      .map(
        (m) => `
    <article class="movie-card">
      <a href="../pages/movie-details.php?id=${
        m.movie_id
      }" class="card-link" title="${safe(m.title)}">
        <div class="poster" style="background-image:url('${safe(
          m.poster_url
        )}')" role="img" aria-label="Poster ${m.movie_id}"></div>
        <h3 class="movie-title">${safe(m.title)}</h3>
      </a>
    </article>
  `
      )
      .join("");

    renderGridPagination();
  }

  function renderGridPagination(currentPage) {
    const gridPagination = document.getElementById("gridPagination");
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    let html = "";

    // « button (only if NOT on first page)
    if (currentPage > 1) {
      html += `<a href="#grid" class="page first" data-page="1">&laquo;</a>`;
    }

    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage ? "active" : "";
      html += `<a href="#grid" class="page ${isActive}" data-page="${i}">${i}</a>`;
    }

    gridPagination.innerHTML = html;

    gridPagination.querySelectorAll(".page").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const page = Number(btn.dataset.page);
        if (page) goToPage(page);
      });
    });
  }

  // ===== TABLE VIEW =====
  function renderTable(page = 1) {
    const tbody = document.getElementById("movieTableBody");
    if (!tbody) return;

    const start = (page - 1) * moviesPerPage;
    const paginated = movies.slice(start, start + moviesPerPage);

    movieTableBody.innerHTML = paginated
      .map(
        (m) => `
    <tr>
      <td class="td-poster">
        <a href="../views/movie-details.php?id=${m.movie_id}">
          <img src="${safe(m.poster_url)}" alt="${safe(m.title)}">
        </a>
      </td>
      <td class="td-title">
        <a href="../views/movie-details.php?id=${m.movie_id}">
          ${safe(m.title)}
        </a>
      </td>
      <td>${formatDate(m.release_date)}</td>
      <td>${capitalize(m.type)}</td>
      <td>${formatDuration(m.duration)}</td>
    </tr>
  `
      )
      .join("");

    renderTablePagination();
  }

  function renderTablePagination(currentPage) {
    const tablePagination = document.getElementById("tablePagination");
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    let html = "";

    // « button
    if (currentPage > 1) {
      html += `<a href="#rows" class="pag first" data-page="1">&laquo;</a>`;
    }

    for (let i = 1; i <= totalPages; i++) {
      const isActive = i === currentPage ? "active" : "";
      html += `<a href="#rows" class="pag ${isActive}" data-page="${i}">${i}</a>`;
    }

    tablePagination.innerHTML = html;

    tablePagination.querySelectorAll(".pag").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const page = Number(btn.dataset.page);
        if (page) goToPage(page);
      });
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => goToPage(1));
  }

  // Initial render
  goToPage(1);

  const gridBtn = document.getElementById("gridViewBtn");
  const rowBtn = document.getElementById("rowViewBtn");

  gridBtn.addEventListener("click", () => {
    location.hash = "grid";
  });

  rowBtn.addEventListener("click", () => {
    location.hash = "rows";
  });
});
