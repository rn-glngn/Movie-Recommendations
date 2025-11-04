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
  const scrollAmount = 400; // adjust as needed

  rightBtn.addEventListener("click", () => {
    grid.scrollBy({ left: scrollAmount, behavior: "smooth" });
  });

  leftBtn.addEventListener("click", () => {
    grid.scrollBy({ left: -scrollAmount, behavior: "smooth" });
  });
});
