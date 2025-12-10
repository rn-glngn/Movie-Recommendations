// --- FUNCTION TO LOAD MOVIE DATA DYNAMICALLY ---
function loadMovieData(movie) {
  // Handle both old and new field names for compatibility
  const title = movie.title || "";
  const posterUrl = movie.poster_url || movie.posterImage || "";
  const releaseDate = movie.release_date || movie.date || "";
  const rated = movie.type || movie.rated || "N/A";
  const duration = movie.duration || "";
  const language = movie.language || "";
  const description = movie.description || "";
  const rating = movie.rating || "N/A";
  const synopsis = movie.synopsis || "";
  const genres = movie.genres || [];
  const directors = movie.directors || [];
  const cast = movie.cast || [];
  const comments = movie.comments || [];

  // Update title and breadcrumb
  document.querySelector(".movie-title").textContent = title + " 🔖";
  document.querySelector(".directory-path").innerHTML = `
    <span><a href="../pages/index.html">Home</a></span> &gt; <span><a href="../pages/movie-list.html">Movies</a></span> &gt; <span>${title}</span>
  `;

  // Update poster image
  const posterImg = document.querySelector(".poster img");
  posterImg.src = posterUrl;
  posterImg.alt = title + " Poster";

  // Update meta info
  const metaInfo = document.querySelector(".meta-info");
  metaInfo.innerHTML = `
    <span>${releaseDate}</span>
    <span>• ${rated}</span>
    <span>• <u>${duration}</u></span>
    <span>• ${language}</span>
  `;

  // Update genres
  const genresDiv = document.querySelector(".genres");
  genresDiv.innerHTML = (Array.isArray(genres) ? genres : [])
    .map((genre) => `<span class="genre-tag">${genre}</span>`)
    .join("");

  // Update description
  document.querySelector(".description").textContent = description;

  // Update rating
  const ratingMax = movie.maxRating || 10;
  document.querySelector(".rating-text").textContent = `${rating}/${ratingMax}`;

  // Update synopsis
  document.querySelector(".synopsis-box").innerHTML = `<p>${synopsis}</p>`;

  // Update directors
  const directorSection = document.querySelector(".director-section");
  directorSection.innerHTML = (Array.isArray(directors) ? directors : [])
    .map(
      (director) => `
    <div class="director-info">
      <div class="director-avatar"><img src="${director.avatar}" alt="${director.name}" class="avatar-img"></div>
      <div class="director-details">
        <h3>${director.name}</h3>
        <p>${director.role}</p>
      </div>
    </div>
  `
    )
    .join("");

  // Update cast
  const castGrid = document.querySelector(".cast-grid");
  castGrid.innerHTML = (Array.isArray(cast) ? cast : [])
    .map(
      (actor) => `
    <div class="cast-member">
      <div class="cast-avatar"><img src="${actor.avatar}" alt="${actor.name}" class="avatar-img"></div>
      <div class="cast-name">${actor.name}</div>
      <div class="cast-role">${actor.role}</div>
    </div>
  `
    )
    .join("");

  // Update comments
  const commentsContainer = document.querySelector(".comments-container");
  commentsContainer.innerHTML = (Array.isArray(comments) ? comments : [])
    .map(
      (comment) => `
    <div class="comment" data-date="${comment.date}">
      <div class="avatar">👤</div>
      <div class="comment-content">
        <div class="comment-header">
          <span class="commenter-name">${comment.commenterName}</span>
          <span class="comment-stars">${comment.stars}</span>
        </div>
        <div class="comment-text">${comment.text}</div>
      </div>
    </div>
  `
    )
    .join("");

  // Update comment count
  const commentCount = document.querySelector(".comment-count");
  commentCount.innerHTML = `<i class="fa-regular fa-comment"></i> ${comments.length} comments`;
}

document.addEventListener("DOMContentLoaded", async function () {
  // --- GET MOVIE ID FROM URL ---
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = parseInt(urlParams.get("id")) || 1; // Default to movie 1
  const currentMovie = await getMovieById(movieId);

  // --- LOAD MOVIE DATA DYNAMICALLY ---
  if (currentMovie) {
    loadMovieData(currentMovie);
  }

  // --- TABS SWITCHING ---
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      tabContents.forEach((content) => content.classList.remove("active"));
      const tabName = tab.getAttribute("data-tab");
      document.getElementById(tabName).classList.add("active");
    });
  });

  // --- SEARCH FUNCTIONALITY ---
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".search-bar button");

  searchButton.addEventListener("click", () => {
    if (searchInput.value.trim()) {
      alert("Searching for: " + searchInput.value);
    }
  });

  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && searchInput.value.trim()) {
      alert("Searching for: " + searchInput.value);
    }
  });
});
