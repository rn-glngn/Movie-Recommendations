// Poster strip clickable behavior - Dynamic
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    // Use first 3 movies from moviesData for trending
    const trendingMovies = typeof moviesData !== 'undefined' ? moviesData.slice(0, 3) : [];
    
    if (trendingMovies.length === 0) return;

    const posterStrip = document.getElementById("posterStrip");
    const bgImg = document.querySelector(".Trending-now-section .bg-img");
    const titleEl = document.querySelector(".Trending-now-section .Titlemovie1");
    const ratingEl = document.querySelector(".Trending-now-section .Rating");
    const descEl = document.querySelector(".Trending-now-section .Description");
    const viewDetailsBtn = document.getElementById("trendingViewDetails");

    let currentTrendingMovieId = trendingMovies[0].id;

    // Generate poster buttons dynamically
    posterStrip.innerHTML = trendingMovies.map(movie => `
      <img class="poster-btn" data-movie="${movie.id}" src="${movie.thumbnailImage}" alt="${movie.title}">
    `).join('');

    // Add recommendations-grid class for styling
    posterStrip.classList.add('recommendations-grid');

    // Populate initial trending display
    if (bgImg && titleEl && ratingEl && descEl) {
      bgImg.src = trendingMovies[0].posterImage;
      titleEl.textContent = trendingMovies[0].title;
      ratingEl.textContent = `${trendingMovies[0].rating}/${trendingMovies[0].maxRating}`;
      descEl.textContent = trendingMovies[0].description;
    }

    // Add click handlers to poster buttons
    const posterBtns = posterStrip.querySelectorAll(".poster-btn");
    posterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const movieId = parseInt(btn.dataset.movie);
        const movie = getMovieById(movieId);
        
        if (movie) {
          currentTrendingMovieId = movie.id;
          bgImg.src = movie.posterImage;
          titleEl.textContent = movie.title;
          ratingEl.textContent = `${movie.rating}/${movie.maxRating}`;
          descEl.textContent = movie.description;

          document.querySelector("#trending").scrollIntoView({ behavior: "smooth" });
        }
      });
    });

    // Add click handler to View Details button
    if (viewDetailsBtn) {
      viewDetailsBtn.addEventListener("click", () => {
        window.location.href = `../pages/movie-details.html?id=${currentTrendingMovieId}`;
      });
    }

    // Add scroll functionality to poster strip
    setTimeout(() => {
      const leftBtn = posterStrip.previousElementSibling;
      const rightBtn = posterStrip.nextElementSibling;
      
      if (leftBtn && rightBtn && leftBtn.classList.contains('scroll-btn')) {
        const scrollAmount = 400;
        
        rightBtn.addEventListener("click", () => {
          posterStrip.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
        
        leftBtn.addEventListener("click", () => {
          posterStrip.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });
      }
    }, 100);
  });
})();

// Movie roulette behavior - Dynamic
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const movies = typeof moviesData !== 'undefined' ? moviesData : [];
    
    if (movies.length === 0) return;

    const spinBtn = document.getElementById("spinBtn");
    const poster = document.getElementById("roulettePoster");
    const titleEl = document.getElementById("resultTitle");
    const infoEl = document.getElementById("resultInfo");
    const descEl = document.getElementById("resultDesc");
    const viewDetailsBtn = document.getElementById("rouletteViewDetails");

    let currentRouletteMovieId = movies[0].id;

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
        currentRouletteMovieId = movie.id;
        poster.src = movie.thumbnailImage;
        titleEl.textContent = movie.title;
        infoEl.textContent = `${movie.date} • Rated ${movie.rated} • ${movie.duration}`;
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
        poster.src = m.thumbnailImage;
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
})();

// Dynamic Recommendation Grids Generator
(function () {
  // Function to generate recommendation grid HTML from movie data
  function generateRecommendationGrid(gridId, movies) {
    const gridElement = document.getElementById(gridId);
    if (!gridElement) return;

    gridElement.innerHTML = movies.map(movie => `
      <a href="../pages/movie-details.html?id=${movie.id}">
        <img src="${movie.thumbnailImage}" alt="${movie.title}">
      </a>
    `).join('');
  }

  async function fetchMovies() {
    try {
        const response = await fetch("../api/fetch_movies.php");
        const movies = await response.json();

        console.log(movies); // just to verify data

       
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Call the function when page loads
fetchMovies();

  // Wait for DOM to be fully loaded and moviesData to be available
  document.addEventListener("DOMContentLoaded", () => {
    // Check if moviesData is available
    if (typeof moviesData !== 'undefined' && moviesData.length > 0) {
      // Generate all three recommendation grids with all available movies
      generateRecommendationGrid('recommendedGrid', moviesData);
      generateRecommendationGrid('newlyAddedGrid', moviesData);
      generateRecommendationGrid('genreGrid', moviesData);

      // Re-initialize slider scroll buttons after grid is populated
      const sliders = document.querySelectorAll(".slider-container");
      sliders.forEach((container) => {
        const grid = container.querySelector(".recommendations-grid");
        const leftBtn = container.querySelector(".scroll-btn.left");
        const rightBtn = container.querySelector(".scroll-btn.right");
        const scrollAmount = 400;

        if (leftBtn && rightBtn && grid) {
          rightBtn.addEventListener("click", () => {
            grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
          });

          leftBtn.addEventListener("click", () => {
            grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
          });
        }
      });
    }
  });
})();
