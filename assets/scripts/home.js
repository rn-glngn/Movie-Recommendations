// ================== GLOBAL MOVIE CACHE ==================
let ALL_MOVIES = [];

// ---------- Utility Functions ----------
async function getAllMovies() {
  if (ALL_MOVIES.length) return ALL_MOVIES;

  const res = await fetch("../modules/fetch-movies.php");
  const data = await res.json();

  ALL_MOVIES = Array.isArray(data) ? data : [];
  return ALL_MOVIES;
}

function getMovieById(id) {
  return ALL_MOVIES.find((m) => Number(m.movie_id) === Number(id));
}

// ---------- DOM READY ----------
document.addEventListener("DOMContentLoaded", async () => {
  await getAllMovies();

  initTrending();
  initRoulette();
});

// ---------- Formatting Helpers ----------
function formatDate(dateStr) {
  if (!dateStr) return "N/A";

  const date = new Date(dateStr);
  if (isNaN(date)) return "N/A";

  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric"
  });
}

function formatDuration(minutes) {
  if (!minutes || isNaN(minutes)) return "";

  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hrs && mins) return `${hrs}hr ${mins} min`;
  if (hrs) return `${hrs}hr`;
  return `${mins} min`;
}

function formatSeasons(seasons) {
  if (!seasons || isNaN(seasons)) return "";
  return seasons === 1 ? "1 Season" : `${seasons} Seasons`;
}

// ================== TRENDING SECTION ==================
function initTrending() {
  const container = document.querySelector(".Trending-now-section");
  if (!container) return;

  const posterStrip = container.querySelector(".poster-strip");
  const bgImg = container.querySelector(".bg-img");
  const titleEl = container.querySelector(".Titlemovie1");
  const descEl = container.querySelector(".Description");

  if (!posterStrip || !bgImg || !titleEl || !descEl) return;
  if (!ALL_MOVIES.length) return;

  const trending = ALL_MOVIES.slice(0, 3);

  posterStrip.innerHTML = trending
    .map(
      (m) => `
      <img class="poster-btn"
           data-movie="${m.movie_id}"
           src="${m.poster_url}"
           alt="${m.title}">
    `
    )
    .join("");

  function display(movie) {
    bgImg.src = movie.background_url || movie.poster_url;
    titleEl.textContent = movie.title;
    descEl.textContent = movie.description || "";
  }

  display(trending[0]);

  posterStrip.querySelectorAll(".poster-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const movie = getMovieById(btn.dataset.movie);
      if (movie) display(movie);
    });
  });
}

// ================== MOVIE ROULETTE ==================
function initRoulette() {
  const spinBtn = document.getElementById("spinBtn");
  const poster = document.getElementById("roulettePoster");
  const titleEl = document.getElementById("resultTitle");
  const infoEl = document.getElementById("resultInfo");
  const descEl = document.getElementById("resultDesc");
  const viewLink = document.querySelector(".View-details.small a");

  const genreSelect = document.getElementById("genreSelect");
  const typeMovies = document.getElementById("typeMovies");
  const typeSeries = document.getElementById("typeSeries");

  //  Prevent null crashes
  if (
    !spinBtn ||
    !poster ||
    !titleEl ||
    !infoEl ||
    !descEl ||
    !genreSelect ||
    !typeMovies ||
    !typeSeries ||
    !ALL_MOVIES.length
  ) {
    return;
  }

  function getFilteredMovies() {
  return ALL_MOVIES.filter((m) => {
    const genreOK =
      genreSelect.value === "any" ||
      (Array.isArray(m.genres) &&
        m.genres.includes(genreSelect.value));

    const typeOK =
      (typeMovies.checked && m.type === "movie") ||
      (typeSeries.checked && m.type === "series");

    return genreOK && typeOK;
  });
}


  function pickRandom() {
    const list = getFilteredMovies();
    if (!list.length) return null;
    return list[Math.floor(Math.random() * list.length)];
  }

  function showMovie(movie) {
  if (!movie) return;

  poster.src = movie.poster_url;
  titleEl.textContent = movie.title;

  const releaseDate = formatDate(
    movie.release_date || movie.release_year
  );

  const metaRight =
    movie.type === "series"
      ? formatSeasons(movie.seasons)
      : formatDuration(movie.duration);

  infoEl.textContent = [releaseDate, metaRight]
    .filter(Boolean)
    .join(" • ");

  descEl.textContent = movie.description || "";

  if (viewLink) {
    viewLink.href = `movie-details.php?id=${movie.movie_id}`;
  }
}


  // Initial display
  showMovie(pickRandom() || ALL_MOVIES[0]);

  // Spin animation
  spinBtn.addEventListener("click", () => {
    const pool = getFilteredMovies();
    if (!pool.length) {
      alert("No movies match your filters.");
      return;
    }

    spinBtn.disabled = true;
    spinBtn.textContent = "Spinning...";

    let ticks = 12;
    const interval = setInterval(() => {
      const m = pickRandom();
      if (m) poster.src = m.poster_url;

      if (--ticks <= 0) {
        clearInterval(interval);
        showMovie(pickRandom());
        spinBtn.disabled = false;
        spinBtn.textContent = "Spin now";
      }
    }, 80);
  });

  // React to filter changes
  [genreSelect, typeMovies, typeSeries].forEach((el) =>
    el.addEventListener("change", () => {
      showMovie(pickRandom());
    })
  );
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".slider-container").forEach(slider => {
    const grid = slider.querySelector(".home-grid");
    const leftBtn = slider.querySelector(".scroll-btn.left");
    const rightBtn = slider.querySelector(".scroll-btn.right");

    if (!grid || !leftBtn || !rightBtn) return;

    const scrollAmount = 350;

    rightBtn.addEventListener("click", () => {
      grid.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
      });
    });

    leftBtn.addEventListener("click", () => {
      grid.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
      });
    });
  });
});

