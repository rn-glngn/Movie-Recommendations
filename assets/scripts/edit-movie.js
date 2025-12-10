let searchTimeout;
const SEARCH_DELAY = 300; // Milliseconds to wait after user stops typing

document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("movieSearch");
  const resultsBox = document.getElementById("searchResults");

  // Live search with debouncing
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim();

    // Clear previous timeout
    clearTimeout(searchTimeout);

    // If query is too short, hide results
    if (query.length < 2) {
      resultsBox.innerHTML = "";
      resultsBox.style.display = "none";
      return;
    }

    // Show loading indicator
    resultsBox.innerHTML =
      "<div class='result-item loading'>Searching...</div>";
    resultsBox.style.display = "block";

    // Debounce: wait for user to stop typing
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, SEARCH_DELAY);
  });

  // Close search results when clicking outside
  document.addEventListener("click", (e) => {
    if (!searchInput.contains(e.target) && !resultsBox.contains(e.target)) {
      resultsBox.innerHTML = "";
      resultsBox.style.display = "none";
    }
  });

  // Handle Enter key to select first result
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const firstResult = resultsBox.querySelector(
        ".result-item:not(.loading):not(.no-results)"
      );
      if (firstResult) {
        firstResult.click();
      }
    }
  });
});

// OPTIONAL: Enhanced search function with text highlighting
// Replace the performSearch function in edit-movie.js with this version

function performSearch(query) {
  const resultsBox = document.getElementById("searchResults");

  fetch("../../modules/search-movie.php?q=" + encodeURIComponent(query))
    .then((res) => {
      if (!res.ok) throw new Error("Search failed");
      return res.json();
    })
    .then((data) => {
      resultsBox.innerHTML = "";
      resultsBox.style.display = "block";

      if (data.length === 0) {
        resultsBox.innerHTML =
          "<div class='result-item no-results'>No movies found</div>";
        return;
      }

      data.forEach((movie) => {
        const item = document.createElement("div");
        item.classList.add("result-item");

        // Highlight matching text
        const highlightedTitle = highlightMatch(movie.title, query);
        item.innerHTML = highlightedTitle;
        item.dataset.id = movie.movie_id;

        // Highlight on hover
        item.addEventListener("mouseenter", () => {
          document.querySelectorAll(".result-item").forEach((el) => {
            el.classList.remove("active");
          });
          item.classList.add("active");
        });

        // Load movie on click
        item.addEventListener("click", () => {
          loadMovie(movie.movie_id, movie.title);
        });

        resultsBox.appendChild(item);
      });
    })
    .catch((err) => {
      console.error("Search error:", err);
      resultsBox.innerHTML =
        "<div class='result-item error'>Error loading results</div>";
    });
}

// Helper function to highlight matching text
function highlightMatch(text, query) {
  if (!query) return escapeHtml(text);

  const escapedText = escapeHtml(text);
  const escapedQuery = escapeHtml(query);

  // Case-insensitive replace
  const regex = new RegExp(
    `(${escapedQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
    "gi"
  );
  return escapedText.replace(regex, "<mark>$1</mark>");
}

// Add keyboard navigation (Arrow keys)
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("movieSearch");
  const resultsBox = document.getElementById("searchResults");
  let selectedIndex = -1;

  searchInput.addEventListener("keydown", (e) => {
    const items = resultsBox.querySelectorAll(
      ".result-item:not(.loading):not(.no-results):not(.error)"
    );

    if (items.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        selectedIndex = (selectedIndex + 1) % items.length;
        updateSelection(items);
        break;

      case "ArrowUp":
        e.preventDefault();
        selectedIndex =
          selectedIndex <= 0 ? items.length - 1 : selectedIndex - 1;
        updateSelection(items);
        break;

      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          items[selectedIndex].click();
        } else if (items.length > 0) {
          items[0].click();
        }
        break;

      case "Escape":
        resultsBox.innerHTML = "";
        resultsBox.style.display = "none";
        selectedIndex = -1;
        break;
    }
  });

  function updateSelection(items) {
    items.forEach((item, index) => {
      if (index === selectedIndex) {
        item.classList.add("active");
        item.scrollIntoView({ block: "nearest", behavior: "smooth" });
      } else {
        item.classList.remove("active");
      }
    });
  }
});

function loadMovie(id, title) {
  const searchInput = document.getElementById("movieSearch");
  const resultsBox = document.getElementById("searchResults");

  // Update search input and close dropdown
  searchInput.value = title;
  resultsBox.innerHTML = "";
  resultsBox.style.display = "none";

  // Show loading state
  showLoadingState();

  fetch("../../modules/get-movie.php?id=" + id)
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load movie");
      return res.json();
    })
    .then((movie) => {
      if (!movie.movie_id) {
        alert("Movie not found");
        hideLoadingState();
        return;
      }

      // Store movie_id in hidden field
      document.getElementById("movie_id").value = movie.movie_id;

      // Populate basic fields
      document.getElementById("movie_type").value = movie.type || "movie";
      document.getElementById("release_date").value = movie.release_date || "";
      document.getElementById("duration").value = movie.duration
        ? movie.duration + " min"
        : "";
      document.getElementById("trailer_url").value = movie.trailer_url || "";
      document.getElementById("synopsis").value = movie.synopsis || "";

      // Set streaming platform
      if (movie.service_id) {
        document.getElementById("service_id").value = movie.service_id;
      } else {
        document.getElementById("service_id").selectedIndex = 0;
      }

      // Check genre checkboxes
      document
        .querySelectorAll('input[name="genres[]"]')
        .forEach((checkbox) => {
          checkbox.checked = false;
        });

      if (movie.genres && Array.isArray(movie.genres)) {
        movie.genres.forEach((genreId) => {
          const checkbox = document.querySelector(
            `input[name="genres[]"][value="${genreId}"]`
          );
          if (checkbox) checkbox.checked = true;
        });
      }

      hideLoadingState();

      // Scroll to top of form
      document
        .querySelector(".form-container")
        .scrollIntoView({ behavior: "smooth" });
    })
    .catch((err) => {
      console.error("Error loading movie:", err);
      alert("Error loading movie data. Please try again.");
      hideLoadingState();
    });
}

function showLoadingState() {
  // Disable form inputs while loading
  document.querySelectorAll("input, select, textarea, button").forEach((el) => {
    el.disabled = true;
  });

  // Add loading class to form
  document.querySelector(".form-container").classList.add("loading");
}

function hideLoadingState() {
  // Re-enable form inputs
  document.querySelectorAll("input, select, textarea, button").forEach((el) => {
    el.disabled = false;
  });

  // Remove loading class
  document.querySelector(".form-container").classList.remove("loading");
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}
