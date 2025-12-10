document.addEventListener("DOMContentLoaded", function () {

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
