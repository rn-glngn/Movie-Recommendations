const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const movieGrid = document.getElementById('movieGrid');
const noResults = document.getElementById('noResults');
const tabs = document.querySelectorAll('.tab');

let currentFilter = 'all';

// Search functionality
searchInput.addEventListener('input', function() {
  filterAndSort();
});

// Sort functionality
sortSelect.addEventListener('change', function() {
  filterAndSort();
});

// Tab functionality
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    currentFilter = this.dataset.tab;
    filterAndSort();
  });
});

function filterAndSort() {
  const searchTerm = searchInput.value.toLowerCase();
  const sortBy = sortSelect.value;
  const cards = Array.from(movieGrid.querySelectorAll('.movie-card'));

  // Filter cards
  let visibleCards = cards.filter(card => {
    const title = card.dataset.title.toLowerCase();
    const type = card.dataset.type;

    const matchesSearch = title.includes(searchTerm);
    const matchesFilter =
      currentFilter === 'all' ||
      (currentFilter === 'movies' && type === 'movie') ||
      (currentFilter === 'tv' && type === 'tv');

    if (matchesSearch && matchesFilter) {
      card.classList.remove('hidden');
      return true;
    } else {
      card.classList.add('hidden');
      return false;
    }
  });

  // Sort cards
  visibleCards.sort((a, b) => {
    const titleA = a.dataset.title;
    const titleB = b.dataset.title;
    const dateA = new Date(a.dataset.date);
    const dateB = new Date(b.dataset.date);

    switch (sortBy) {
      case 'az':
        return titleA.localeCompare(titleB);
      case 'za':
        return titleB.localeCompare(titleA);
      case 'earliest':
        return dateB - dateA;
      case 'oldest':
        return dateA - dateB;
      default:
        return 0;
    }
  });

  // Reorder DOM elements
  visibleCards.forEach(card => {
    movieGrid.appendChild(card);
  });

  // Show/hide no results message
  if (visibleCards.length === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
  }
}
