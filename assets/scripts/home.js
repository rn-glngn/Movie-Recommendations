// ---------- Utility Functions ----------
async function getAllMovies() {
  const res = await fetch("../modules/fetch-movies.php"); // Endpoint returning all movies as JSON
  return await res.json();
}

async function getMovieById(id) {
  const movies = await getAllMovies();
  return movies.find((m) => m.movie_id == id);
}

// ---------- Trending Section ----------
(async function () {
  const trendingContainer = document.querySelector(".Trending-now-section");
  const posterStrip = trendingContainer.querySelector(".poster-strip");
  const bgImg = trendingContainer.querySelector(".bg-img");
  const titleEl = trendingContainer.querySelector(".Titlemovie1");
  const descEl = trendingContainer.querySelector(".Description");

  const movies = await getAllMovies();
  if (!movies.length) return;

  const trendingMovies = movies.slice(0, 3); // Top 3 latest movies

  // Populate poster strip
  posterStrip.innerHTML = trendingMovies
    .map(
      (m) =>
        `<img class="poster-btn" data-movie="${m.movie_id}" src="${m.poster_url}" alt="${m.title}">`
    )
    .join("");

  const displayMovie = (movie) => {
    bgImg.src = movie.background_url || movie.poster_url;
    titleEl.textContent = movie.title;
    descEl.textContent = movie.description;
  };

  displayMovie(trendingMovies[0]);

  posterStrip.querySelectorAll(".poster-btn").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const movieId = parseInt(btn.dataset.movie);
      const movie = await getMovieById(movieId);
      if (movie) displayMovie(movie);
    });
  });
})();

// ---------- Movie Roulette ----------
document.addEventListener("DOMContentLoaded", async () => {
  const spinBtn = document.getElementById("spinBtn");
  const poster = document.getElementById("roulettePoster");
  const titleEl = document.getElementById("resultTitle");
  const infoEl = document.getElementById("resultInfo");
  const descEl = document.getElementById("resultDesc");
  const viewDetailsBtn = document.querySelector(".View-details.small a");

  const genreSelect = document.getElementById("genreSelect");
  const typeMovies = document.getElementById("typeMovies");
  const typeSeries = document.getElementById("typeSeries");

  const movies = await getAllMovies();
  if (!movies.length) return;

  let currentRouletteId = movies[0].movie_id;

  // Filter movies based on genre and type
  const getFilteredMovies = () => {
    return movies.filter((m) => {
      const genreMatch =
        genreSelect.value === "any" || m.genre === genreSelect.value;
      const typeMatch =
        (typeMovies.checked && m.type === "Movie") ||
        (typeSeries.checked && m.type === "Series");
      return genreMatch && typeMatch;
    });
  };

  const pickRandom = () => {
    const filtered = getFilteredMovies();
    if (!filtered.length) return null;
    return filtered[Math.floor(Math.random() * filtered.length)];
  };

  const showMovie = (movie) => {
    if (!movie) return;
    currentRouletteId = movie.movie_id;
    poster.classList.add("fade");
    titleEl.classList.add("fade");
    infoEl.classList.add("fade");
    descEl.classList.add("fade");

    setTimeout(() => {
      poster.src = movie.poster_url;
      titleEl.textContent = movie.title;
      infoEl.textContent = `${movie.release_date || movie.date || "N/A"} • ${
        movie.duration || ""
      }`;
      descEl.textContent = movie.description;

      poster.classList.remove("fade");
      titleEl.classList.remove("fade");
      infoEl.classList.remove("fade");
      descEl.classList.remove("fade");

      // Update "View Details" link dynamically
      if (viewDetailsBtn)
        viewDetailsBtn.href = `movie-details.php?id=${currentRouletteId}`;
    }, 200);
  };

  // Show first movie
  showMovie(pickRandom() || movies[0]);

  // Spin button
  spinBtn.addEventListener("click", () => {
    const filtered = getFilteredMovies();
    if (!filtered.length) {
      alert("No movies found for the selected genre/type.");
      return;
    }

    spinBtn.disabled = true;
    spinBtn.textContent = "Spinning...";
    let spins = 12;
    const interval = setInterval(() => {
      const movie = pickRandom();
      if (movie) poster.src = movie.poster_url;
      spins--;
      if (spins <= 0) {
        clearInterval(interval);
        showMovie(pickRandom());
        spinBtn.disabled = false;
        spinBtn.textContent = "Spin now";
      }
    }, 80);
  });

  // Update roulette when filters change
  [genreSelect, typeMovies, typeSeries].forEach((el) => {
    el.addEventListener("change", () => showMovie(pickRandom()));
  });
});
