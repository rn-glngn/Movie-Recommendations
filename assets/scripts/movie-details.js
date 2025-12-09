// --- FUNCTION TO LOAD MOVIE DATA DYNAMICALLY ---
function loadMovieData(movie) {
  // Update title and breadcrumb
  document.querySelector(".movie-title").textContent = movie.title + " 🔖";
  document.querySelector(".directory-path").innerHTML = `
    <span><a href="../pages/index.html">Home</a></span> &gt; <span><a href="../pages/movie-list.html">Movies</a></span> &gt; <span>${movie.title}</span>
  `;

  // Update poster image
  document.querySelector(".poster img").src = movie.posterImage;
  document.querySelector(".poster img").alt = movie.title + " Poster";

  // Update meta info
  const metaInfo = document.querySelector(".meta-info");
  metaInfo.innerHTML = `
    <span>${movie.date}</span>
    <span>• ${movie.rated}</span>
    <span>• <u>${movie.duration}</u></span>
    <span>• ${movie.language}</span>
  `;

  // Update genres
  const genresDiv = document.querySelector(".genres");
  genresDiv.innerHTML = movie.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('');

  // Update description
  document.querySelector(".description").textContent = movie.description;

  // Update rating
  document.querySelector(".rating-text").textContent = `${movie.rating}/${movie.maxRating}`;

  // Update synopsis
  document.querySelector(".synopsis-box").innerHTML = `<p>${movie.synopsis}</p>`;

  // Update directors
  const directorSection = document.querySelector(".director-section");
  directorSection.innerHTML = movie.directors.map(director => `
    <div class="director-info">
      <div class="director-avatar"><img src="${director.avatar}" alt="${director.name}" class="avatar-img"></div>
      <div class="director-details">
        <h3>${director.name}</h3>
        <p>${director.role}</p>
      </div>
    </div>
  `).join('');

  // Update cast
  const castGrid = document.querySelector(".cast-grid");
  castGrid.innerHTML = movie.cast.map(actor => `
    <div class="cast-member">
      <div class="cast-avatar"><img src="${actor.avatar}" alt="${actor.name}" class="avatar-img"></div>
      <div class="cast-name">${actor.name}</div>
      <div class="cast-role">${actor.role}</div>
    </div>
  `).join('');

  // Update comments
  const commentsContainer = document.querySelector(".comments-container");
  commentsContainer.innerHTML = movie.comments.map(comment => `
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
  `).join('');

  // Update comment count
  const commentCount = document.querySelector(".comment-count");
  commentCount.innerHTML = `<i class="fa-regular fa-comment"></i> ${movie.comments.length} comments`;
}

document.addEventListener("DOMContentLoaded", function () {
  // --- GET MOVIE ID FROM URL ---
  const urlParams = new URLSearchParams(window.location.search);
  const movieId = parseInt(urlParams.get("id")) || 1; // Default to movie 1
  const currentMovie = getMovieById(movieId);

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

  // --- COMMENTS SORT + VIEW MORE ---
  const commentsContainer = document.querySelector(".comments-container");
  const sortDropdown = document.getElementById("sort-comments");
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  const allComments = Array.from(
    commentsContainer.querySelectorAll(".comment")
  );
  const initialVisible = 4;

  // Function: Hide comments after the first 4
  function hideExtraComments() {
    allComments.forEach((comment, index) => {
      comment.classList.toggle("hidden", index >= initialVisible);
    });
  }

  // Function: Sort comments
  function sortComments(order) {
    const sorted = [...allComments].sort((a, b) => {
      const dateA = new Date(a.dataset.date);
      const dateB = new Date(b.dataset.date);
      return order === "newest" ? dateB - dateA : dateA - dateB;
    });
    sorted.forEach((comment) => commentsContainer.appendChild(comment));
    hideExtraComments();
  }

  // Initial state
  hideExtraComments();

  // --- Sort Dropdown Event ---
  sortDropdown.addEventListener("change", function () {
    sortComments(this.value);
    viewMoreBtn.textContent = "view more ▼";
  });

  // --- View More / See Less Event ---
  viewMoreBtn.addEventListener("click", function () {
    const hiddenComments =
      commentsContainer.querySelectorAll(".comment.hidden");

    if (this.textContent.includes("view more")) {
      hiddenComments.forEach((comment) => comment.classList.remove("hidden"));
      this.textContent = "see less ▲";
    } else {
      hideExtraComments();
      this.textContent = "view more ▼";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const viewMoreSpan = document.getElementById("viewMoreRecommendations");
  const movieCards = document.querySelectorAll(".movie-grid .movie-card");
  let showingAll = false;

  // function to determine how many cards to show
  function getInitialVisible() {
    if (window.innerWidth >= 1024) return 4; // desktop
    if (window.innerWidth >= 600) return 3; // tablet
    return 2; // mobile
  }

  // function to apply visibility
  function showInitialCards() {
    const initialVisible = getInitialVisible();
    movieCards.forEach((card, index) => {
      card.classList.toggle("hidden", index >= initialVisible);
    });
    viewMoreSpan.textContent = "view more ▼";
    showingAll = false;
  }

  // initial setup
  showInitialCards();

  // toggle button click
  viewMoreSpan.addEventListener("click", () => {
    if (showingAll) {
      // collapse view
      showInitialCards();
    } else {
      // show all
      movieCards.forEach((card) => card.classList.remove("hidden"));
      viewMoreSpan.textContent = "see less ▲";
      showingAll = true;
    }
  });

  // reapply on resize (only when collapsed)
  window.addEventListener("resize", () => {
    if (!showingAll) showInitialCards();
  });
});
