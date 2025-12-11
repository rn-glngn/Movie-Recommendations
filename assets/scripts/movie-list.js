async function loadMovies() {
  try {
    const params = new URLSearchParams(window.location.search);
    const genreId = params.get("genre_id");
    let res;
    if (genreId) {
      res = await fetch(`../backend/fetchmoviesbygenreid.php?genre_id=${encodeURIComponent(genreId)}`);
    } else {
      res = await fetch("../backend/fetchmovies.php");
    }
    const data = await res.json();
    const list = Array.isArray(data) ? data : (data.data || []);
    return list;
  } catch (err) {
    console.error(err);
    return [];
  }
}

async function getAllMovies() {
  const movies = await loadMovies()
  return movies;
}

// Movie List Page - Dynamic Grid and Table Generation
(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    const movies = await getAllMovies();
    console.log(movies)
    if (movies.length === 0) return;

    const moviesPerPage = 12;
    let currentPage = 1;

    // --- GRID VIEW ---
    function renderGrid(page = 1) {
      const movieGrid = document.getElementById("movieGrid");
      const start = (page - 1) * moviesPerPage;
      const end = start + moviesPerPage;
      const paginatedMovies = movies.slice(start, end);

      movieGrid.innerHTML = paginatedMovies.map(movie => `
        <article class="movie-card">
          <a href="../pages/movie-details.html?id=${movie.movie_id || movie.id}" class="card-link" title="View details for ${movie.title}">
            <div class="poster" style="background-image:url('${movie.poster_url || movie.posterImage}')" role="img"
              aria-label="Poster ${movie.movie_id || movie.id}"></div>
            <h3 class="movie-title">${movie.title}</h3>
          </a>
        </article>
      `).join('');

      renderGridPagination(page);
    }

    function renderGridPagination(currentPage) {
      const gridPagination = document.getElementById("gridPagination");
      const totalPages = Math.ceil(movies.length / moviesPerPage);

      let paginationHTML = '';
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage ? 'active' : '';
        paginationHTML += `<a href="#grid" class="page ${isActive}" data-page="${i}">${i}</a>`;
      }
      paginationHTML += `<a href="#grid" class="page" data-page="${currentPage + 1}">»</a>`;

      gridPagination.innerHTML = paginationHTML;

      // Add pagination click handlers
      gridPagination.querySelectorAll('.page').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const page = parseInt(link.dataset.page);
          if (page > 0 && page <= totalPages) {
            renderGrid(page);
          }
        });
      });
    }

    // --- TABLE VIEW ---
    function renderTable(page = 1) {
      const movieTableBody = document.getElementById("movieTableBody");
      const start = (page - 1) * moviesPerPage;
      const end = start + moviesPerPage;
      const paginatedMovies = movies.slice(start, end);

      movieTableBody.innerHTML = paginatedMovies.map(movie => `
        <tr>
          <td class="td-poster">
            <a href="../pages/movie-details.html?id=${movie.movie_id || movie.id}">
              <img src="${movie.poster_url || movie.posterImage}" alt="${movie.title}">
            </a>
          </td>
          <td class="td-title"><a href="../pages/movie-details.html?id=${movie.movie_id || movie.id}">${movie.title}</a></td>
          <td>${movie.release_date || movie.date || 'N/A'}</td>
          <td>${movie.rating || 'N/A'}</td>
          <td>${movie.rating ? (movie.rating * 10).toFixed(1) : 'N/A'}</td>
        </tr>
      `).join('');

      renderTablePagination(page);
    }

    function renderTablePagination(currentPage) {
      const tablePagination = document.getElementById("tablePagination");
      const totalPages = Math.ceil(movies.length / moviesPerPage);

      let paginationHTML = '<a href="#rows" class="pag">&laquo;</a>';
      for (let i = 1; i <= totalPages; i++) {
        const isActive = i === currentPage ? 'active' : '';
        paginationHTML += `<a href="#rows" class="pag ${isActive}" data-page="${i}">${i}</a>`;
      }
      paginationHTML += '<a href="#rows" class="pag">&raquo;</a>';

      tablePagination.innerHTML = paginationHTML;

      // Add pagination click handlers
      tablePagination.querySelectorAll('.pag').forEach((link, index) => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          let page = currentPage;

          if (link.textContent === '«') {
            page = Math.max(1, currentPage - 1);
          } else if (link.textContent === '»') {
            page = Math.min(totalPages, currentPage + 1);
          } else if (link.dataset.page) {
            page = parseInt(link.dataset.page);
          }

          if (page > 0 && page <= totalPages) {
            renderTable(page);
          }
        });
      });
    }

    // Initial render
    renderGrid(1);
    renderTable(1);
  });
})();
