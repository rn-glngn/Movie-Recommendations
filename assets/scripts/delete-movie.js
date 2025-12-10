let searchTimeout;
const SEARCH_DELAY = 300;

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("movie-title");
  const resultsBox = document.getElementById("searchResults");
  const movieIdField = document.getElementById("movie_id");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    clearTimeout(searchTimeout);
    movieIdField.value = 0;

    if (query.length < 2) {
      resultsBox.innerHTML = "";
      resultsBox.style.display = "none";
      return;
    }

    resultsBox.innerHTML =
      "<div class='result-item loading'>Searching...</div>";
    resultsBox.style.display = "block";

    searchTimeout = setTimeout(() => {
      fetch("../../modules/search-movie.php?q=" + encodeURIComponent(query))
        .then((res) => res.json())
        .then((data) => {
          resultsBox.innerHTML = "";
          if (data.length === 0) {
            resultsBox.innerHTML =
              "<div class='result-item no-results'>No movies found</div>";
            return;
          }
          data.forEach((movie) => {
            const item = document.createElement("div");
            item.classList.add("result-item");
            item.textContent = movie.title;
            item.dataset.id = movie.movie_id;

            item.addEventListener("click", () => {
              searchInput.value = movie.title;
              movieIdField.value = movie.movie_id;
              resultsBox.innerHTML = "";
              resultsBox.style.display = "none";
            });

            resultsBox.appendChild(item);
          });
        })
        .catch((err) => {
          resultsBox.innerHTML =
            "<div class='result-item error'>Error loading results</div>";
          console.error(err);
        });
    }, SEARCH_DELAY);
  });

  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.innerHTML = "";
      resultsBox.style.display = "none";
    }
  });
});
