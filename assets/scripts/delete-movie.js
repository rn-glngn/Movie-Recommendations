let searchTimeout;
const SEARCH_DELAY = 300;

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("movie-title");
  const resultsBox = document.getElementById("searchResults");
  const movieIdField = document.getElementById("movie_id");
  const deleteForm = document.getElementById("deleteForm");

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();
    clearTimeout(searchTimeout);

    // Reset movie_id when user changes input
    movieIdField.value = 0;

    if (query.length < 2) {
      resultsBox.innerHTML = "";
      resultsBox.style.display = "none";
      return;
    }

    // Show loading indicator
    resultsBox.innerHTML =
      "<div class='result-item loading'>Searching...</div>";
    resultsBox.style.display = "block";

    searchTimeout = setTimeout(() => {
      fetch("../../modules/search-movie.php?q=" + encodeURIComponent(query))
        .then((res) => res.json())
        .then((data) => {
          resultsBox.innerHTML = "";

          if (!data.length) {
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
              console.log("Selected movie:", movie);
              searchInput.value = movie.title;
              movieIdField.value = movie.movie_id;
              resultsBox.innerHTML = "";
              resultsBox.style.display = "none";
            });

            resultsBox.appendChild(item);
          });
        })
        .catch((err) => {
          console.error("Search error:", err);
          resultsBox.innerHTML =
            "<div class='result-item error'>Error loading results</div>";
        });
    }, SEARCH_DELAY);
    console.log("Search input listener added.");
  });
  // Close results when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.innerHTML = "";
      resultsBox.style.display = "none";
    }
  });

  // Form Validation
  deleteForm.addEventListener("submit", (e) => {
    console.log("Form submitting...");
    console.log("movie_id:", movieIdField.value);

    if (!movieIdField.value || movieIdField.value == "0") {
      e.preventDefault();
      alert("Please select a movie from the search results.");
    }
    console.log("Form submit listener added.");
  });
});
