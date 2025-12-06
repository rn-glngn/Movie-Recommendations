// Poster strip clickable behavior
(function () {
  const trendingMovies = {
    1: {
      title: "The Fragrant Flower",
      img: "../assets/images/the-fragrant-flower-blooms-with-dignity.jpg",
      rating: "8.2/10",
      desc: "A gentle story about growth, friendship and dignity in a beautifully crafted world.",
    },
    2: {
      title: "Wednesday",
      img: "../assets/images/wednesdayshow.jpg",
      rating: "8.1/10",
      desc: "A dark, comedic mystery following a young woman's adventures at a strange academy full of secrets.",
    },
    3: {
      title: "Breaking Bad",
      img: "../assets/images/breaking-bad-poster.jpg",
      rating: "9.5/10",
      desc: "A high school chemistry teacher turns to a life of crime after a terminal diagnosis in this epic drama.",
    },
  };

  const posterBtns = document.querySelectorAll(".poster-btn");
  const bgImg = document.querySelector(".Trending-now-section .bg-img");
  const titleEl = document.querySelector(".Trending-now-section .Titlemovie1");
  const ratingEl = document.querySelector(".Trending-now-section .Rating");
  const descEl = document.querySelector(".Trending-now-section .Description");

  posterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const movieId = btn.dataset.movie;
      const movie = trendingMovies[movieId];

      bgImg.src = movie.img;
      titleEl.textContent = movie.title;
      ratingEl.textContent = movie.rating;
      descEl.textContent = movie.desc;

      // smooth scroll to trending section
      document
        .querySelector("#trending")
        .scrollIntoView({ behavior: "smooth" });
    });
  });
})();

// Movie roulette behavior
(function () {
  const movies = [
    {
      title: "Arcane",
      img: "../assets/images/arcane.jpg",
      info: "2021  •  Rated SPG  •  2 Seasons",
      desc: "In the cities of Piltover and Zaun, tensions rise as inventors, hooligans, politicians and crime lords grow increasingly dissatisfied...",
    },
    {
      title: "The Fragrant Flower",
      img: "../assets/images/the-fragrant-flower-blooms-with-dignity.jpg",
      info: "2024  •  Movie",
      desc: "A gentle story about growth, friendship and dignity.",
    },
    {
      title: "Wednesday",
      img: "../assets/images/wednesdayshow.jpg",
      info: "2022  •  TV Show",
      desc: "A dark, comedic mystery following a young woman's adventures at a strange academy.",
    },
    {
      title: "Breaking Bad",
      img: "../assets/images/breaking-bad-poster.jpg",
      info: "2008  •  TV Show",
      desc: "A high school chemistry teacher turns to a life of crime after a terminal diagnosis.",
    },
    {
      title: "Dandadan",
      img: "../assets/images/dandadan-2024.avif",
      info: "2024  •  Anime",
      desc: "A thrilling anime adventure with supernatural elements and epic battles.",
    },
    {
      title: "Weapons (2025)",
      img: "../assets/images/Weapons-2025-horror-movie-review.jpg",
      info: "2025  •  Horror Movie",
      desc: "A chilling horror film that explores dark themes and suspense.",
    },
    {
      title: "Scott Pilgrim",
      img: "../assets/images/scott.jpg",
      info: "2010  •  Action Comedy",
      desc: "A quirky action-comedy about battling an ex's seven evil exes.",
    },
    {
      title: "Joker",
      img: "../assets/images/joker.jpg",
      info: "2019  •  Drama",
      desc: "A psychological thriller exploring the transformation of a struggling comedian.",
    },
    {
      title: "Interstellar",
      img: "../assets/images/interstellar.jpg",
      info: "2014  •  Sci-Fi",
      desc: "An epic sci-fi journey through space and time to save humanity.",
    },
    {
      title: "Dr. Stone",
      img: "../assets/images/dr.stone.jpg",
      info: "2019  •  Anime",
      desc: "A brilliant anime about rebuilding civilization using science.",
    },
    {
      title: "Moana",
      img: "../assets/images/moana.jpg",
      info: "2016  •  Animation",
      desc: "A vibrant animated adventure of a girl sailing across the ocean.",
    },
    {
      title: "The Hows of Us",
      img: "../assets/images/thehows.jpg",
      info: "2018  •  Romance Comedy",
      desc: "A heartwarming romance-comedy about rediscovering love and connection.",
    },
    {
      title: "Kpop Demon Hunters",
      img: "../assets/images/kpopdemon.jpg",
      info: "2025  •  Animation",
      desc: "When not performing for sold-out stadiums, Kpop superstars Rumi, Mira, and Zoey secretly fight supernatural threats as demon hunters.",
    },
  ];

  const spinBtn = document.getElementById("spinBtn");
  const poster = document.getElementById("roulettePoster");
  const titleEl = document.getElementById("resultTitle");
  const infoEl = document.getElementById("resultInfo");
  const descEl = document.getElementById("resultDesc");

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
      poster.src = movie.img;
      titleEl.textContent = movie.title;
      infoEl.textContent = movie.info;
      descEl.textContent = movie.desc;

      poster.classList.remove("fade");
      titleEl.classList.remove("fade");
      infoEl.classList.remove("fade");
      descEl.classList.remove("fade");
    }, 220);
  }

  showMovie(movies[0]);

  spinBtn.addEventListener("click", () => {
    spinBtn.disabled = true;
    spinBtn.textContent = "Spinning...";
    let spins = 12;
    const interval = setInterval(() => {
      const m = pickRandom();
      poster.src = m.img;
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
})();

const sliders = document.querySelectorAll(".slider-container");

sliders.forEach((container) => {
  const grid = container.querySelector(".recommendations-grid");
  const leftBtn = container.querySelector(".scroll-btn.left");
  const rightBtn = container.querySelector(".scroll-btn.right");

  if (!leftBtn || !rightBtn || !grid) return;


  function getScrollAmount() {
    const img = grid.querySelector('img');
    if (!img) return 258; 
    const imgWidth = img.offsetWidth;
    const gap = 8; 
    return imgWidth + gap;
  }

  rightBtn.addEventListener("click", () => {
    grid.scrollBy({ 
      left: getScrollAmount(), 
      behavior: "smooth" 
    });
  });

  leftBtn.addEventListener("click", () => {
    grid.scrollBy({ 
      left: -getScrollAmount(), 
      behavior: "smooth" 
    });
  });

  function updateButtons() {
    const isAtStart = grid.scrollLeft <= 0;
    const isAtEnd = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;
    
    if (isAtStart) {
      leftBtn.style.opacity = '0';
      leftBtn.style.pointerEvents = 'none';
    } else {
      leftBtn.style.opacity = '';
      leftBtn.style.pointerEvents = '';
    }
    
    if (isAtEnd) {
      rightBtn.style.opacity = '0';
      rightBtn.style.pointerEvents = 'none';
    } else {
      rightBtn.style.opacity = '';
      rightBtn.style.pointerEvents = '';
    }
  }
  
  grid.addEventListener('scroll', updateButtons);
  
  updateButtons();
  
  window.addEventListener('resize', updateButtons);
});

// Search Bar Functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('.search-bar input');
  const searchButton = document.querySelector('.search-bar button');
  const searchBar = document.querySelector('.search-bar');
  
  // Create search results dropdown
  const searchResults = document.createElement('div');
  searchResults.className = 'search-results';
  searchBar.appendChild(searchResults);
  
  // Sample movie/TV show data (replace with your actual data or API)
  const mediaData = [
    { title: 'Alice In Borderland', type: 'TV Show', rating: '8.6', image: '../assets/images/Alice-In-Borderland.jpg' },
    { title: 'The Fragrant Flower Blooms with Dignity', type: 'TV Show', rating: '8.2', image: '../assets/images/the-fragrant-flower-blooms-with-dignity.jpg' },
    { title: 'Wednesday', type: 'TV Show', rating: '8.1', image: '../assets/images/wednesdayshow.jpg' },
    { title: 'Breaking Bad', type: 'TV Show', rating: '9.5', image: '../assets/images/breaking-bad-poster.jpg' },
    { title: 'Dandadan', type: 'TV Show', rating: '8.4', image: '../assets/images/dandadan-2024.avif' },
    { title: 'Weapons', type: 'Movie', rating: '7.3', image: '../assets/images/Weapons-2025-horror-movie-review.jpg' },
    { title: 'Scott Pilgrim', type: 'Movie', rating: '7.6', image: '../assets/images/scott.jpg' },
    { title: 'Joker', type: 'Movie', rating: '8.4', image: '../assets/images/joker.jpg' },
    { title: 'Interstellar', type: 'Movie', rating: '8.7', image: '../assets/images/interstellar.jpg' },
    { title: 'Dr. Stone', type: 'TV Show', rating: '8.3', image: '../assets/images/dr.stone.jpg' },
    { title: 'Moana', type: 'Movie', rating: '7.6', image: '../assets/images/moana.jpg' },
    { title: 'Arcane', type: 'TV Show', rating: '9.0', image: '../assets/images/arcane.jpg' }
  ];
  
  // Search function
  function performSearch(query) {
    if (query.trim() === '') {
      searchResults.style.display = 'none';
      return;
    }
    
    const filtered = mediaData.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase())
    );
    
    displayResults(filtered, query);
  }
  
  // Display search results
  function displayResults(results, query) {
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-no-results">
          No results found for "${query}"
        </div>
      `;
      searchResults.style.display = 'block';
      return;
    }
    
    searchResults.innerHTML = results.map(item => `
      <div class="search-result-item">
        <img src="${item.image}" alt="${item.title}" onerror="this.style.display='none'">
        <div class="search-result-info">
          <div class="search-result-title">${item.title}</div>
          <div class="search-result-meta">${item.type} • ⭐ ${item.rating}</div>
        </div>
      </div>
    `).join('');
    
    searchResults.style.display = 'block';
    
    // Add click handlers to results
    document.querySelectorAll('.search-result-item').forEach((item, index) => {
      item.addEventListener('click', () => {
        window.location.href = '../pages/movie-details.html';
      });
    });
  }
  
  // Input event listener
  searchInput.addEventListener('input', (e) => {
    performSearch(e.target.value);
  });
  
  // Search button click
  searchButton.addEventListener('click', () => {
    performSearch(searchInput.value);
  });
  
  // Enter key to search
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch(searchInput.value);
    }
  });
  
  // Close search results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchBar.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
  
  // Keep search results open when clicking inside search bar
  searchBar.addEventListener('click', (e) => {
    e.stopPropagation();
  });
});