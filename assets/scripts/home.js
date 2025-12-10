// Poster strip clickable behavior
(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    console.log("alert laert");
    // Fetch trending movies from database
    const allMovies = await getAllMovies();
    const trendingMovies = allMovies.slice(0, 3);

    if (trendingMovies.length === 0) return;

    const posterBtns = document.querySelectorAll(".poster-btn");
    const bgImg = document.querySelector(".Trending-now-section .bg-img");
    const titleEl = document.querySelector(
      ".Trending-now-section .Titlemovie1"
    );
    const ratingEl = document.querySelector(".Trending-now-section .Rating");
    const descEl = document.querySelector(".Trending-now-section .Description");

    let currentTrendingMovieId =
      trendingMovies[0].movie_id || trendingMovies[0].id;

    // Generate poster buttons dynamically
    posterStrip.innerHTML = trendingMovies
      .map(
        (movie) => `
      <img class="poster-btn" data-movie="${movie.movie_id || movie.id}" src="${
          movie.poster_url || movie.thumbnailImage
        }" alt="${movie.title}">
    `
      )
      .join("");

    // Add recommendations-grid class for styling
    posterStrip.classList.add("recommendations-grid");

    // Populate initial trending display
    if (bgImg && titleEl && ratingEl && descEl) {
      bgImg.src = trendingMovies[0].poster_url || trendingMovies[0].posterImage;
      titleEl.textContent = trendingMovies[0].title;
      ratingEl.textContent = trendingMovies[0].rating || "N/A";
      descEl.textContent = trendingMovies[0].description;
    }

    // Add click handlers to poster buttons
    const posterBtns = posterStrip.querySelectorAll(".poster-btn");
    posterBtns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const movieId = parseInt(btn.dataset.movie);
        const movie = await getMovieById(movieId);

        if (movie) {
          currentTrendingMovieId = movie.movie_id || movie.id;
          bgImg.src = movie.poster_url || movie.posterImage;
          titleEl.textContent = movie.title;
          ratingEl.textContent = movie.rating || "N/A";
          descEl.textContent = movie.description;

          document
            .querySelector("#trending")
            .scrollIntoView({ behavior: "smooth" });
        }
      });
    });
  });
})();

// Movie roulette behavior
(function () {
  document.addEventListener("DOMContentLoaded", async () => {
    const movies = await getAllMovies();

    if (movies.length === 0) return;

    const spinBtn = document.getElementById("spinBtn");
    const poster = document.getElementById("roulettePoster");
    const titleEl = document.getElementById("resultTitle");
    const infoEl = document.getElementById("resultInfo");
    const descEl = document.getElementById("resultDesc");

    let currentRouletteMovieId = movies[0].movie_id || movies[0].id;

    function pickRandom() {
      const idx = Math.floor(Math.random() * movies.length);
      return movies[idx];
    }

    function showMovie(movie) {
      poster.classList.add("fade");
      titleEl.classList.add("fade");
      infoEl.classList.add("fade");
      descEl.classList.add("fade");

      setTimeout(() => {
        currentRouletteMovieId = movie.movie_id || movie.id;
        poster.src = movie.poster_url || movie.thumbnailImage;
        titleEl.textContent = movie.title;
        infoEl.textContent = `${movie.release_date || movie.date} • ${
          movie.duration
        }`;
        descEl.textContent = movie.description;

        poster.classList.remove("fade");
        titleEl.classList.remove("fade");
        infoEl.classList.remove("fade");
        descEl.classList.remove("fade");
      }, 220);
    }

    // Show first movie initially
    showMovie(movies[0]);

    spinBtn.addEventListener("click", () => {
      spinBtn.disabled = true;
      spinBtn.textContent = "Spinning...";
      let spins = 12;
      const interval = setInterval(() => {
        const m = pickRandom();
        poster.src = m.poster_url || m.thumbnailImage;
        spins--;
        if (spins <= 0) {
          clearInterval(interval);
          const final = pickRandom();
          showMovie(final);
          spinBtn.disabled = false;
          spinBtn.textContent = "Spin now";
        }
      }, 80);
    });

    // Add click handler to roulette View Details button
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener("click", () => {
        window.location.href = `../pages/movie-details.html?id=${currentRouletteMovieId}`;
      });
    }
  });
});

// Dynamic Recommendation Grids Generator
(function () {
  // Function to generate recommendation grid HTML from movie data
  function generateRecommendationGrid(gridId, movies) {
    const gridElement = document.getElementById(gridId);
    if (!gridElement) return;

    gridElement.innerHTML = movies
      .map(
        (movie) => `
      <a href="../pages/movie-details.html?id=${movie.movie_id || movie.id}">
        <img src="${movie.poster_url || movie.thumbnailImage}" alt="${
          movie.title
        }">
      </a>
    `
      )
      .join("");
  }

  // Wait for DOM to be fully loaded and fetch movies from database
  document.addEventListener("DOMContentLoaded", async () => {
    // Fetch all movies from database
    const movies = await getAllMovies();

    if (movies && movies.length > 0) {
      // Generate all three recommendation grids with all available movies
      generateRecommendationGrid("recommendedGrid", movies);
      generateRecommendationGrid("newlyAddedGrid", movies);
      generateRecommendationGrid("genreGrid", movies);

      setTimeout(() => {
        poster.src = movie.img;
        titleEl.textContent = movie.title;
        infoEl.textContent = movie.info;
        descEl.textContent = movie.desc;

        poster.classList.remove("fade");
        titleEl.classList.remove("fade");
        infoEl.classList.remove("fade");
        descEl.classList.remove("fade");
      }, 220);
    }

    showMovie(movies[0]);

    spinBtn.addEventListener("click", () => {
      spinBtn.disabled = true;
      spinBtn.textContent = "Spinning...";
      let spins = 12;
      const interval = setInterval(() => {
        const m = pickRandom();
        poster.src = m.img;
        spins--;
        if (spins <= 0) {
          clearInterval(interval);
          const final = pickRandom();
          showMovie(final);
          spinBtn.disabled = false;
          spinBtn.textContent = "Spin now";
        }
      }, 80);
    });
  });
});

const sliders = document.querySelectorAll(".slider-container");

sliders.forEach((container) => {
  const grid = container.querySelector(".recommendations-grid");
  const leftBtn = container.querySelector(".scroll-btn.left");
  const rightBtn = container.querySelector(".scroll-btn.right");

  if (!leftBtn || !rightBtn || !grid) return;

  function getScrollAmount() {
    const img = grid.querySelector("img");
    if (!img) return 258;
    const imgWidth = img.offsetWidth;
    const gap = 8;
    return imgWidth + gap;
  }

  rightBtn.addEventListener("click", () => {
    grid.scrollBy({
      left: getScrollAmount(),
      behavior: "smooth",
    });
  });

  leftBtn.addEventListener("click", () => {
    grid.scrollBy({
      left: -getScrollAmount(),
      behavior: "smooth",
    });
  });

  function updateButtons() {
    const isAtStart = grid.scrollLeft <= 0;
    const isAtEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;

    if (isAtStart) {
      leftBtn.style.opacity = "0";
      leftBtn.style.pointerEvents = "none";
    } else {
      leftBtn.style.opacity = "";
      leftBtn.style.pointerEvents = "";
    }

    if (isAtEnd) {
      rightBtn.style.opacity = "0";
      rightBtn.style.pointerEvents = "none";
    } else {
      rightBtn.style.opacity = "";
      rightBtn.style.pointerEvents = "";
    }
  }

  grid.addEventListener("scroll", updateButtons);

  updateButtons();

  window.addEventListener("resize", updateButtons);
});

// Search Bar Functionality
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector(".search-bar input");
  const searchButton = document.querySelector(".search-bar button");
  const searchBar = document.querySelector(".search-bar");

  // Create search results dropdown
  const searchResults = document.createElement("div");
  searchResults.className = "search-results";
  searchBar.appendChild(searchResults);

  // Sample movie/TV show data (replace with your actual data or API)
  const mediaData = [
    {
      title: "Alice In Borderland",
      type: "TV Show",
      rating: "8.6",
      image: "../assets/images/Alice-In-Borderland.jpg",
    },
    {
      title: "The Fragrant Flower Blooms with Dignity",
      type: "TV Show",
      rating: "8.2",
      image: "../assets/images/the-fragrant-flower-blooms-with-dignity.jpg",
    },
    {
      title: "Wednesday",
      type: "TV Show",
      rating: "8.1",
      image: "../assets/images/wednesdayshow.jpg",
    },
    {
      title: "Breaking Bad",
      type: "TV Show",
      rating: "9.5",
      image: "../assets/images/breaking-bad-poster.jpg",
    },
    {
      title: "Dandadan",
      type: "TV Show",
      rating: "8.4",
      image: "../assets/images/dandadan-2024.avif",
    },
    {
      title: "Weapons",
      type: "Movie",
      rating: "7.3",
      image: "../assets/images/Weapons-2025-horror-movie-review.jpg",
    },
    {
      title: "Scott Pilgrim",
      type: "Movie",
      rating: "7.6",
      image: "../assets/images/scott.jpg",
    },
    {
      title: "Joker",
      type: "Movie",
      rating: "8.4",
      image: "../assets/images/joker.jpg",
    },
    {
      title: "Interstellar",
      type: "Movie",
      rating: "8.7",
      image: "../assets/images/interstellar.jpg",
    },
    {
      title: "Dr. Stone",
      type: "TV Show",
      rating: "8.3",
      image: "../assets/images/dr.stone.jpg",
    },
    {
      title: "Moana",
      type: "Movie",
      rating: "7.6",
      image: "../assets/images/moana.jpg",
    },
    {
      title: "Arcane",
      type: "TV Show",
      rating: "9.0",
      image: "../assets/images/arcane.jpg",
    },
  ];

  // Search function
  function performSearch(query) {
    if (query.trim() === "") {
      searchResults.style.display = "none";
      return;
    }

    const filtered = mediaData.filter((item) =>
      item.title.toLowerCase().includes(query.toLowerCase())
    );

    displayResults(filtered, query);
  }

  // Display search results
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          No results found for "${query}"
        </div>
      `;
      searchResults.style.display = "block";
      return;
    }

    searchResults.innerHTML = results
      .map(
        (item) => `
      <div class="search-result-item">
        <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">
        <div class="search-result-info">
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-meta">${item.type} • ⭐ ${item.rating}</div>
        </div>
      </div>
    `
      )
      .join("");

    searchResults.style.display = "block";

    // Add click handlers to results
    document.querySelectorAll(".search-result-item").forEach((item, index) => {
      item.addEventListener("click", () => {
        window.location.href = "../pages/movie-details.html";
      });
    });
  }

  // Input event listener
  searchInput.addEventListener("input", (e) => {
    performSearch(e.target.value);
  });

  // Search button click
  searchButton.addEventListener("click", () => {
    performSearch(searchInput.value);
  });

  // Enter key to search
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      performSearch(searchInput.value);
    }
  });

  // Close search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchBar.contains(e.target)) {
      searchResults.style.display = "none";
    }
  });

  // Keep search results open when clicking inside search bar
  searchBar.addEventListener("click", (e) => {
    e.stopPropagation();
  });
});
