const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');
const usersGrid = document.getElementById('usersGrid');
const noResults = document.getElementById('noResults');
const tabs = document.querySelectorAll('.tab');

let currentTab = 'all';

// Tab functionality
tabs.forEach(tab => {
  tab.addEventListener('click', function() {
    tabs.forEach(t => t.classList.remove('active'));
    this.classList.add('active');
    currentTab = this.dataset.tab;
    filterAndSort();
  });
});

// Search functionality
searchInput.addEventListener('input', function() {
  filterAndSort();
});

// Sort functionality
sortSelect.addEventListener('change', function() {
  filterAndSort();
});

function filterAndSort() {
  const searchTerm = searchInput.value.toLowerCase();
  const sortBy = sortSelect.value;
  const cards = Array.from(usersGrid.querySelectorAll('.user-card'));

  // Filter cards based on tab and search
  let visibleCards = cards.filter(card => {
    const name = card.dataset.name.toLowerCase();
    const username = card.dataset.username.toLowerCase();
    const type = card.dataset.type;
    const status = card.dataset.status;

    // Filter by tab
    let matchesTab = true;
    if (currentTab === 'active') {
      matchesTab = status === 'active';
    } else if (currentTab === 'admins') {
      matchesTab = type === 'admin';
    }

    // Filter by search
    const matchesSearch = name.includes(searchTerm) || username.includes(searchTerm);

    if (matchesTab && matchesSearch) {
      card.classList.remove('hidden');
      return true;
    } else {
      card.classList.add('hidden');
      return false;
    }
  });

  // Sort cards
  visibleCards.sort((a, b) => {
    const nameA = a.dataset.name;
    const nameB = b.dataset.name;
    const dateA = new Date(a.dataset.date);
    const dateB = new Date(b.dataset.date);

    switch (sortBy) {
      case 'az':
        return nameA.localeCompare(nameB);
      case 'za':
        return nameB.localeCompare(nameA);
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
    usersGrid.appendChild(card);
  });

  // Show/hide no results message
  if (visibleCards.length === 0) {
    noResults.style.display = 'block';
  } else {
    noResults.style.display = 'none';
  }
}
