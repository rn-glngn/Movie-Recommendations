    let currentPage = 1;
    let currentView = 'grid';
    let totalMovies = 0;

    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const typeFilter = urlParams.get('type') || 'all';
    let searchQuery = urlParams.get('search') || '';
    const genreFilter = urlParams.get('genre') || '';

    // Check authentication status
    async function checkAuth() {
      try {
        //const response = await fetch('../api/auth/check-session.php');
        const data = await response.json();
        
        const authLinks = document.getElementById('authLinks');
        const navDropdown = document.getElementById('navDropdown');

        
        if(data.logged_in) {
          authLinks.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            <span>${data.username}</span>
          `;
          
          navDropdown.innerHTML = `
            <li><a href="profile.html">Profile</a></li>
            <li><a href="profile.html#settings">Settings</a></li>
            <li class="nav-submenu-parent">
              Request
              <ul class="nav-submenu">
                <li><a href="forms/add-movie.html">Add Movie</a></li>
                <li><a href="forms/edit-movie.html">Edit Movie</a></li>
                <li><a href="forms/delete-movie.html">Delete Movie</a></li>
              </ul>
            </li>
            <li><a href="about.html">About</a></li>
            <li><a href="api/auth/logout.php">Logout</a></li>
          `;
          
          if(data.role === 'admin') {
            navDropdown.innerHTML = '<li><a href="pages/admin/dashboard.html">Admin Dashboard</a></li>' + navDropdown.innerHTML;
          }
        } else {
          authLinks.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
              <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
            </svg>
            <a href="login.html">Login</a>
            <span class="separator">|</span>
            <a href="signup.html">Signup</a>
          `;
          
          navDropdown.innerHTML = `
            <li><a href="profile.html">Profile</a></li>
            <li><a href="profile.html#settings">Settings</a></li>
            <li class="nav-submenu-parent">
              Request
              <ul class="nav-submenu">
                <li><a href="forms/add-movie.html">Add Movie</a></li>
                <li><a href="forms/edit-movie.html">Edit Movie</a></li>
                <li><a href="forms/delete-movie.html">Delete Movie</a></li>
              </ul>
            </li>
            <li><a href="about.html">About</a></li>
            <li><a href="index.html">Logout</a></li>
          `;
        }
      } catch(error) {
        console.error('Auth check error:', error);
      }
    }

    // Load genres from database
    async function loadGenres() {
      try {
        const response = await fetch('../api/movies/get-genres.php');
        const data = await response.json();
        
        if(data.success && data.genres) {
          const genreList = document.getElementById('genreList');
          genreList.innerHTML = '';
          
          data.genres.forEach(genre => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="movie-list.html?genre=${genre.genre_id}">${genre.genre_name}</a>`;
            genreList.appendChild(li);
          });
        }
      } catch(error) {
        console.error('Error loading genres:', error);
      }
    }

    async function loadServices() {
    try {
      const response = await fetch('api/services/get-services.php');
      const data = await response.json();

      const serviceList = document.getElementById('serviceList');
      serviceList.innerHTML = '';

      if (data.success && data.services.length > 0) {
        data.services.forEach(service => {
          const li = document.createElement('li');
          li.textContent = service.service_name;
          serviceList.appendChild(li);
        });
      } else {
        serviceList.innerHTML = '<li>No services found</li>';
      }
    } catch (error) {
      console.error('Error loading services:', error);
      document.getElementById('serviceList').innerHTML = '<li>Error loading services</li>';
    }
  }

   async function loadMovies(sortBy = 'latest') {
  try {
    let url = `../api/movies/get-movies.php?sort=${sortBy}`;
    if (typeFilter !== 'all') url += `&type=${typeFilter}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`;
    if (genreFilter) url += `&genre=${genreFilter}`;

    
    const response = await fetch(url);
    const data = await response.json();
    
    if(data.success) {
      totalMovies = data.movies.length;
      
      if(currentView === 'grid') {
        displayGridView(data.movies);
      } else {
        displayRowView(data.movies);
      }
    } else {
      showError('Failed to load movies. Please try again.');
    }
  } catch(error) {
    showError('An error occurred while loading movies.');
  }
}

    // Display movies in grid view
    function displayGridView(movies) {
      const container = document.getElementById('movieGrid');
      container.innerHTML = '';
      
      if(movies.length === 0) {
        container.innerHTML = '<p style="text-align:center; grid-column: 1/-1; padding: 40px;">No movies found</p>';
        return;
      }
      
      movies.forEach(movie => {
        const article = document.createElement('article');
        article.className = 'movie-card';
        
        const posterUrl = movie.poster_url || 'images/placeholder.jpg';
        
        article.innerHTML = `
          <a href="movie-details.html?id=${movie.movie_id}" class="card-link" title="View details for ${movie.title}">
            <div class="poster" style="background-image:url('${posterUrl}')" role="img" aria-label="${movie.title}"></div>
            <h3 class="movie-title">${movie.title}</h3>
          </a>
        `;
        
        container.appendChild(article);
      });
    }

    // Display movies in row view
    function displayRowView(movies) {
      const tbody = document.getElementById('movieTable');
      tbody.innerHTML = '';
      
      if(movies.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align:center; padding: 40px;">No movies found</td></tr>';
        return;
      }
      
      movies.forEach(movie => {
        const tr = document.createElement('tr');
        tr.style.cursor = 'pointer';
        tr.onclick = () => window.location.href = `movie-details.html?id=${movie.movie_id}`;
        
        const posterUrl = movie.poster_url || 'images/placeholder.jpg';
        const releaseDate = movie.release_date || 'N/A';
        const type = movie.type === 'series' ? 'TV Series' : 'Movie';
        const duration = movie.duration ? `${movie.duration} min` : 'N/A';
        
        tr.innerHTML = `
          <td class="td-poster"><img src="${posterUrl}" alt="${movie.title}"></td>
          <td class="td-title">${movie.title}</td>
          <td>${releaseDate}</td>
          <td>${type}</td>
          <td>${duration}</td>
        `;
        
        tbody.appendChild(tr);
      });
    }

    

    // Change page
    function changePage(page) {
      currentPage = page;
      const sortBy = document.getElementById('sort').value;
      loadMovies(page, sortBy);
      window.scrollTo(0, 0);
    }

    // View switching
    document.getElementById('gridViewBtn').addEventListener('click', function(e) {
      e.preventDefault();
      currentView = 'grid';
      document.getElementById('grid').style.display = 'block';
      document.getElementById('rows').style.display = 'none';
      this.classList.add('active');
      document.getElementById('rowViewBtn').classList.remove('active');
      loadMovies(currentPage, document.getElementById('sort').value);
    });

    document.getElementById('rowViewBtn').addEventListener('click', function(e) {
      e.preventDefault();
      currentView = 'rows';
      document.getElementById('grid').style.display = 'none';
      document.getElementById('rows').style.display = 'block';
      this.classList.add('active');
      document.getElementById('gridViewBtn').classList.remove('active');
      loadMovies(currentPage, document.getElementById('sort').value);
    });

    // Sort change
    document.getElementById('sort').addEventListener('change', function() {
      currentPage = 1;
      loadMovies(currentPage, this.value);
    });

    // Search functionality
    document.getElementById('searchBtn').addEventListener('click', function() {
      const query = document.getElementById('searchInput').value.trim();
      if(query) {
        window.location.href = `movie-list.html?search=${encodeURIComponent(query)}`;
      }
    });

   document.getElementById('searchInput').addEventListener('input', function() {
  const query = this.value.trim();
  if (query === '') {
    // Remove ?search=... from the URL
    const params = new URLSearchParams(window.location.search);
    params.delete('search');
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    history.replaceState(null, '', newUrl);

    // Clear the global variable
    searchQuery = '';

    // Reload all movies instantly
    loadMovies(document.getElementById('sort').value);
  }
});

    document.getElementById('searchInput').addEventListener('keypress', function(e) {
      if(e.key === 'Enter') {
        document.getElementById('searchBtn').click();
      }
    });

    // Update page title based on filters
    function updatePageTitle() {
      let title = 'Movie List';
      
      if(typeFilter === 'series') {
        title = 'TV Shows';
      } else if(typeFilter === 'movie') {
        title = 'Movies';
      }
      
      if(searchQuery) {
        title = `Search Results for "${searchQuery}"`;
        document.getElementById('searchInput').value = searchQuery;
      }
      
      document.getElementById('pageTitle').textContent = title;
      document.getElementById('breadcrumb').textContent = title;
    }

    // Show error message
    function showError(message) {
      const container = currentView === 'grid' ? 
        document.getElementById('movieGrid') : 
        document.getElementById('movieTable');
      
      if(currentView === 'grid') {
        container.innerHTML = `<p style="text-align:center; grid-column: 1/-1; padding: 40px; color: #e50914;">${message}</p>`;
      } else {
        container.innerHTML = `<tr><td colspan="5" style="text-align:center; padding: 40px; color: #e50914;">${message}</td></tr>`;
      }
    }

    // Initialize page
    window.addEventListener('DOMContentLoaded', function() {
      checkAuth();
      loadGenres();
      updatePageTitle();
      loadMovies(currentPage, 'popularity');
    });