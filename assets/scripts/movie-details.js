document.addEventListener("DOMContentLoaded", function() {
  // --- TABS SWITCHING ---
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      tabContents.forEach(content => content.classList.remove('active'));
      const tabName = tab.getAttribute('data-tab');
      document.getElementById(tabName).classList.add('active');
    });
  });

  // --- SEARCH FUNCTIONALITY ---
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');

  searchButton.addEventListener('click', () => {
    if (searchInput.value.trim()) {
      alert('Searching for: ' + searchInput.value);
    }
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && searchInput.value.trim()) {
      alert('Searching for: ' + searchInput.value);
    }
  });

  // --- COMMENTS SORT + VIEW MORE ---
  const commentsContainer = document.querySelector(".comments-container");
  const sortDropdown = document.getElementById("sort-comments");
  const viewMoreBtn = document.getElementById("viewMoreBtn");
  const allComments = Array.from(commentsContainer.querySelectorAll(".comment"));
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
    sorted.forEach(comment => commentsContainer.appendChild(comment));
    hideExtraComments();
  }

  // Initial state
  hideExtraComments();

  // --- Sort Dropdown Event ---
  sortDropdown.addEventListener("change", function() {
    sortComments(this.value);
    viewMoreBtn.textContent = "view more ▼";
  });

  // --- View More / See Less Event ---
  viewMoreBtn.addEventListener("click", function() {
    const hiddenComments = commentsContainer.querySelectorAll(".comment.hidden");

    if (this.textContent.includes("view more")) {
      hiddenComments.forEach(comment => comment.classList.remove("hidden"));
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
  const initialVisible = 4; // number of cards shown at first
  let showingAll = false;

  // hide extra cards initially
  movieCards.forEach((card, index) => {
    if (index >= initialVisible) card.classList.add("hidden");
  });

  viewMoreSpan.addEventListener("click", () => {
    if (showingAll) {
      // collapse to initialVisible
      movieCards.forEach((card, index) => {
        card.classList.toggle("hidden", index >= initialVisible);
      });
      viewMoreSpan.textContent = "view more ▼";
      showingAll = false;
    } else {
      // show all
      movieCards.forEach(card => card.classList.remove("hidden"));
      viewMoreSpan.textContent = "see less ▲";
      showingAll = true;
    }
  });
});