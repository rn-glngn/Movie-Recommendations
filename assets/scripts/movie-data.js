// Movie Details Array - Dynamic Data Structure
const moviesData = [
  {
    id: 1,
    title: "Joker",
    date: "October 4, 2019",
    duration: "2h 2m",
    language: "English",
    genres: [
      "Psychological Drama",
      "Psychological Thriller",
      "Tragedy",
      "Crime",
      "Drama",
      "Thriller"
    ],
    rated: "R",
    rating: 8.6,
    maxRating: 10,
    stars: "★★★★★",
    description: "Arthur Fleck, a party clown and a failed stand-up comedian, leads an impoverished life with his ailing mother. However, when society shuns him and brands him as a freak, he decides to embrace the life of chaos in Gotham City.",
    posterImage: "../assets/images/Joker Poster.jpeg",
    thumbnailImage: "../assets/images/joker.jpg",
    synopsis: "In 1981, party clown and aspiring stand-up comedian Arthur Fleck (Joaquin Phoenix) a mentally ill, impoverished man disregarded by society, lives with his mother, Penny (Frances Conroy), in Gotham City. Gotham is rife with crime and unemployment. Social services have been franchised and impoverished. Even the nicest sections of the city are now looking like slums due to the breakdown of social services. Penny has been writing letters to Thomas Wayne (Brett Cullen), asking him as the city's richest man for a hand out. Penny expects an answer and an offer for help from Thomas, but the letter from Thomas never arrives. Arthur suffers from a neurological disorder that causes him to have random, uncontrollable laughing fits, requiring medication he depends on social services to obtain. Arthur is in a terminal state of depression and none of the medications are able to lift his spirits.",
    directors: [
      {
        name: "Todd Phillips",
        role: "Director, Producer, Screenplay",
        avatar: "../assets/images/Todd Phillips.webp"
      }
    ],
    cast: [
      {
        name: "Joaquin Phoenix",
        role: "Arthur Fleck / Joker",
        avatar: "../assets/images/Joaquin Pheonix.webp"
      },
      {
        name: "Zazie Beetz",
        role: "Sophie Dumond",
        avatar: "../assets/images/Zazie Beetz.webp"
      },
      {
        name: "Frances Conroy",
        role: "Penny Fleck",
        avatar: "../assets/images/Frances Conroy.jpg"
      },
      {
        name: "Robert De Niro",
        role: "Murray Franklin",
        avatar: "../assets/images/Robert De Niro.webp"
      },
      {
        name: "Glenn Fleshler",
        role: "Randall",
        avatar: "../assets/images/Glenn Flesher.jpg"
      },
      {
        name: "Marc Maron",
        role: "Gene Ufland",
        avatar: "../assets/images/Marc Maron.webp"
      }
    ],
    reviews: [
      {
        id: 1,
        commenterName: "Juan Dela Cruz",
        rating: 5,
        text: "Masterpiece! Joaquin Phoenix's performance is absolutely incredible.",
        date: "2025-10-18T14:30:00"
      },
      {
        id: 2,
        commenterName: "Maria Santos",
        rating: 5,
        text: "A dark and gripping psychological thriller that stays with you long after viewing.",
        date: "2025-10-18T13:15:00"
      },
      {
        id: 3,
        commenterName: "Carlos Rivera",
        rating: 4,
        text: "Brilliantly directed. Not for everyone due to its dark subject matter, but powerful filmmaking.",
        date: "2025-10-17T10:45:00"
      },
      {
        id: 4,
        commenterName: "Ana Lopez",
        rating: 5,
        text: "Amazing cinematography! The score complements the story perfectly.",
        date: "2025-10-15T09:00:00"
      }
    ],
    comments: [
      {
        id: 1,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "13645543 !!",
        date: "2025-10-18T14:30:00"
      },
      {
        id: 2,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "gregrgrgrgrgrgrg !!",
        date: "2025-10-18T14:30:00"
      },
      {
        id: 3,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "asdasdasdasd !!",
        date: "2025-10-15T09:00:00"
      },
      {
        id: 4,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "blablabla !!",
        date: "2025-10-15T09:00:00"
      },
      {
        id: 5,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "Great movie highly recommended !!",
        date: "2025-10-14T08:20:00"
      },
      {
        id: 6,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "Amazing cinematography!",
        date: "2025-10-13T16:45:00"
      }
    ]
  },
  {
    id: 2,
    title: "Alice In Borderland",
    date: "July 18, 2008",
    duration: "2h 32m",
    language: "English",
    genres: [
      "Action",
      "Crime",
      "Drama",
      "Thriller"
    ],
    rated: "PG-13",
    rating: 9.0,
    maxRating: 10,
    stars: "★★★★★",
    description: "Arisu - a listless, jobless and video-game-obsessed young man - suddenly finds himself in a strange, emptied-out version of Tokyo in which he and his friends must compete indangerous games in order to survive.",
    posterImage: "../assets/images/Alice-In-Borderland.jpg",
    thumbnailImage: "../assets/images/Alice-In-Borderland.jpg",
    synopsis: "Alice in Borderland is a survival drama series that follows Arisu Ryohei, a video-game-obsessed young man who finds himself in a strange, emptied-out version of Tokyo. He and his friends are forced to compete in dangerous games to survive. The series explores themes of survival, the human psyche, and the lengths to which people will go to escape their dire circumstances. The games are a metaphor for the challenges and temptations that people face in their daily lives, and the characters' actions reflect their inner struggles and choices.",
    directors: [
      {
        name: "Christopher Nolan",
        role: "Director",
        avatar: "../assets/images/Christopher Nolan.webp"
      }
    ],
    cast: [
      {
        name: "Christian Bale",
        role: "Bruce Wayne / Batman",
        avatar: "../assets/images/Christian Bale.webp"
      },
      {
        name: "Heath Ledger",
        role: "The Joker",
        avatar: "../assets/images/Heath Ledger.webp"
      },
      {
        name: "Aaron Eckhart",
        role: "Harvey Dent / Two-Face",
        avatar: "../assets/images/Aaron Eckhart.webp"
      },
      {
        name: "Maggie Gyllenhaal",
        role: "Rachel Dawes",
        avatar: "../assets/images/Maggie Gyllenhaal.webp"
      },
      {
        name: "Gary Oldman",
        role: "Commissioner Gordon",
        avatar: "../assets/images/Gary Oldman.webp"
      },
      {
        name: "Michael Caine",
        role: "Alfred Pennyworth",
        avatar: "../assets/images/Michael Caine.webp"
      }
    ],
    reviews: [
      {
        id: 1,
        commenterName: "Daniel Torres",
        rating: 5,
        text: "One of the greatest superhero movies ever made. Heath Ledger's Joker is iconic.",
        date: "2025-09-20T12:00:00"
      },
      {
        id: 2,
        commenterName: "Sofia Martinez",
        rating: 5,
        text: "Christopher Nolan's direction is masterful. The plot twists are mind-bending.",
        date: "2025-09-19T15:30:00"
      },
      {
        id: 3,
        commenterName: "Pedro Gonzalez",
        rating: 4,
        text: "Excellent film with great performances. A bit long but definitely worth the watch.",
        date: "2025-09-18T11:20:00"
      },
      {
        id: 4,
        commenterName: "Isabella Ruiz",
        rating: 5,
        text: "The Dark Knight sets the standard for all superhero films. Absolutely brilliant.",
        date: "2025-09-17T09:45:00"
      }
    ],
    comments: [
      {
        id: 1,
        commenterName: "Batman Fan",
        stars: "★★★★★",
        text: "Best Batman movie ever made!",
        date: "2025-09-20T12:00:00"
      },
      {
        id: 2,
        commenterName: "Nolan Enthusiast",
        stars: "★★★★★",
        text: "Nolan is a genius. This movie is perfect.",
        date: "2025-09-19T15:30:00"
      },
      {
        id: 3,
        commenterName: "Movie Critic",
        stars: "★★★★☆",
        text: "Great action sequences and storytelling.",
        date: "2025-09-18T11:20:00"
      },
      {
        id: 4,
        commenterName: "Film Enthusiast",
        stars: "★★★★★",
        text: "Heath Ledger's performance is unforgettable!",
        date: "2025-09-17T09:45:00"
      }
    ]
  },
  {
    id: 3,
    title: "The Dark Knight",
    date: "July 18, 2008",
    duration: "2h 32m",
    language: "English",
    genres: [
      "Action",
      "Crime",
      "Drama",
      "Thriller"
    ],
    rated: "PG-13",
    rating: 9.0,
    maxRating: 10,
    stars: "★★★★★",
    description: "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. Batman must accept one of the greatest psychological and physical tests to fight injustice.",
    posterImage: "../assets/images/The_Dark_Knight_(2008_film).jpg",
    thumbnailImage: "../assets/images/The_Dark_Knight_(2008_film).jpg",
    synopsis: "Batman continues his fight against crime in Gotham City. Now he must battle a new menace known as the Joker, a criminal mastermind who introduces a reign of chaos and anarchy to the city. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman wages an all-out war against the criminal underground to bring justice back to Gotham. However, the Joker is one step ahead at every turn, and his plans are far from simple.",
    directors: [
      {
        name: "Christopher Nolan",
        role: "Director",
        avatar: "../assets/images/christophernolan.jpg"
      }
    ],
    cast: [
      {
        name: "Christian Bale",
        role: "Bruce Wayne / Batman",
        avatar: "../assets/images/brucewayne.jpg"
      },
      {
        name: "Heath Ledger",
        role: "The Joker",
        avatar: "../assets/images/heathledger.jpg"
      },
      {
        name: "Aaron Eckhart",
        role: "Harvey Dent / Two-Face",
        avatar: "../assets/images/aaroneckhart.jpg"
      },
      {
        name: "Maggie Gyllenhaal",
        role: "Rachel Dawes",
        avatar: "../assets/images/maggiegyllenhaal.jpg"
      },
      {
        name: "Gary Oldman",
        role: "Commissioner Gordon",
        avatar: "../assets/images/garyoldman.jpg"
      },
      {
        name: "Michael Caine",
        role: "Alfred Pennyworth",
        avatar: "../assets/images/michaelcaine.jpg"
      }
    ],
    reviews: [
      {
        id: 1,
        commenterName: "Daniel Torres",
        rating: 5,
        text: "One of the greatest superhero movies ever made. Heath Ledger's Joker is iconic.",
        date: "2025-09-20T12:00:00"
      },
      {
        id: 2,
        commenterName: "Sofia Martinez",
        rating: 5,
        text: "Christopher Nolan's direction is masterful. The plot twists are mind-bending.",
        date: "2025-09-19T15:30:00"
      },
      {
        id: 3,
        commenterName: "Pedro Gonzalez",
        rating: 4,
        text: "Excellent film with great performances. A bit long but definitely worth the watch.",
        date: "2025-09-18T11:20:00"
      },
      {
        id: 4,
        commenterName: "Isabella Ruiz",
        rating: 5,
        text: "The Dark Knight sets the standard for all superhero films. Absolutely brilliant.",
        date: "2025-09-17T09:45:00"
      }
    ],
    comments: [
      {
        id: 1,
        commenterName: "Batman Fan",
        stars: "★★★★★",
        text: "Best Batman movie ever made!",
        date: "2025-09-20T12:00:00"
      },
      {
        id: 2,
        commenterName: "Nolan Enthusiast",
        stars: "★★★★★",
        text: "Nolan is a genius. This movie is perfect.",
        date: "2025-09-19T15:30:00"
      },
      {
        id: 3,
        commenterName: "Movie Critic",
        stars: "★★★★☆",
        text: "Great action sequences and storytelling.",
        date: "2025-09-18T11:20:00"
      },
      {
        id: 4,
        commenterName: "Film Enthusiast",
        stars: "★★★★★",
        text: "Heath Ledger's performance is unforgettable!",
        date: "2025-09-17T09:45:00"
      }
    ]
  },
  {
    id: 4,
    title: "It’s a Wonderful Life",
    date: "1946",
    duration: "2h 10m",
    language: "English",
    genres: [
      "Drama",
      "Fantasy",
      "Family"
    ],
    rated: "R",
    rating: 8.6,
    maxRating: 10,
    stars: "★★★★",
    description: "An angel is sent from Heaven to help a desperately frustrated businessman see the value of his own life.",
    posterImage: "../assets/images/Its-A-Wonderful-Life-Movie-Poster-600x898.jpg",
    thumbnailImage: "../assets/images/Its-A-Wonderful-Life-Movie-Poster-600x898.jpg",
    synopsis: "George Bailey is a kind-hearted man who has spent his life helping others in his small hometown of Bedford Falls, often putting aside his own dreams and ambitions for the good of his family and community. He runs the Bailey Brothers’ Building and Loan, a small business that helps working-class families afford homes, standing in opposition to the greedy and powerful businessman Henry F. Potter. On Christmas Eve, George becomes overwhelmed by financial trouble and feels that his life has been a failure. Believing that the world would be better off without him, he considers ending his life. In response to prayers for George, a guardian angel named Clarence is sent down from Heaven to help him. Clarence shows George what Bedford Falls would be like if he had never been born. In this alternate version of the town, life is darker and colder, the people George once helped are worse off, and Mr. Potter has grown even more powerful. Through this experience, George realizes how much his simple acts of kindness have affected the lives of others. Moved by gratitude for his life, George wishes to live again and is returned to the real world. He comes home to find that his friends, family, and neighbors have all come together to help him in his time of need. George finally understands that he is truly rich, not in money, but in love and friendship.",
    directors: [
      {
        name: "Frank Capra",
        role: "Director, Writer, Producer",
        avatar: "../assets/images/frankcapra.jpg"
      }
    ],
    cast: [
    
      {
        name: "James Stewart",
        role: "AGeorge Bailey",
        avatar: "../assets/images/James Stewartt.png"
      },
      {
        name: "Donna Reed",
        role: "Mary Hatch Bailey",
        avatar: "../assets/images/DonnaReed.png"
      },
      {
        name: "Lionel Barrymore",
        role: "Mr. Henry F. Potter",
        avatar: "../assets/images/lionelbarry.png"
      },
      {
        name: "Thomas Mitchell Henry Travers ",
        role: "William Bailey",
        avatar: "../assets/images/ThomasMit.png"
      }
    ],
    reviews: [
      {
        id: 1,
        commenterName: "Juan Dela Cruz",
        rating: 5,
        text: "Masterpiece! Joaquin Phoenix's performance is absolutely incredible.",
        date: "2025-10-18T14:30:00"
      },
      {
        id: 2,
        commenterName: "Maria Santos",
        rating: 5,
        text: "A dark and gripping psychological thriller that stays with you long after viewing.",
        date: "2025-10-18T13:15:00"
      },
      {
        id: 3,
        commenterName: "Carlos Rivera",
        rating: 4,
        text: "Brilliantly directed. Not for everyone due to its dark subject matter, but powerful filmmaking.",
        date: "2025-10-17T10:45:00"
      },
      {
        id: 4,
        commenterName: "Ana Lopez",
        rating: 5,
        text: "Amazing cinematography! The score complements the story perfectly.",
        date: "2025-10-15T09:00:00"
      }
    ],
    comments: [
      {
        id: 1,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "13645543 !!",
        date: "2025-10-18T14:30:00"
      },
      {
        id: 2,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "gregrgrgrgrgrgrg !!",
        date: "2025-10-18T14:30:00"
      },
      {
        id: 3,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "asdasdasdasd !!",
        date: "2025-10-15T09:00:00"
      },
      {
        id: 4,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "blablabla !!",
        date: "2025-10-15T09:00:00"
      },
      {
        id: 5,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "Great movie highly recommended !!",
        date: "2025-10-14T08:20:00"
      },
      {
        id: 6,
        commenterName: "Juan Dela Cruz",
        stars: "★★★★★",
        text: "Amazing cinematography!",
        date: "2025-10-13T16:45:00"
      }
    ]
  }
  
];

// Function to get a movie by ID
function getMovieById(movieId) {
  return moviesData.find(movie => movie.id === movieId);
}

// Function to get all movies
function getAllMovies() {
  return moviesData;
}

// Function to add a new movie
function addMovie(movieObj) {
  const newId = Math.max(...moviesData.map(m => m.id)) + 1;
  const newMovie = { id: newId, ...movieObj };
  moviesData.push(newMovie);
  return newMovie;
}

// Function to update a movie
function updateMovie(movieId, updatedObj) {
  const movieIndex = moviesData.findIndex(m => m.id === movieId);
  if (movieIndex !== -1) {
    moviesData[movieIndex] = { ...moviesData[movieIndex], ...updatedObj };
    return moviesData[movieIndex];
  }
  return null;
}

// Function to delete a movie
function deleteMovie(movieId) {
  const movieIndex = moviesData.findIndex(m => m.id === movieId);
  if (movieIndex !== -1) {
    const deletedMovie = moviesData.splice(movieIndex, 1);
    return deletedMovie[0];
  }
  return null;
}

// Function to add a comment/review to a movie
function addCommentToMovie(movieId, commentObj) {
  const movie = getMovieById(movieId);
  if (movie) {
    const newCommentId = Math.max(...movie.comments.map(c => c.id)) + 1;
    const newComment = { id: newCommentId, ...commentObj };
    movie.comments.push(newComment);
    return newComment;
  }
  return null;
}

// Function to get movie statistics
function getMovieStats(movieId) {
  const movie = getMovieById(movieId);
  if (movie) {
    const avgReviewRating = movie.reviews.length > 0 
      ? (movie.reviews.reduce((sum, r) => sum + r.rating, 0) / movie.reviews.length).toFixed(2)
      : 0;
    
    return {
      movieTitle: movie.title,
      totalReviews: movie.reviews.length,
      totalComments: movie.comments.length,
      averageReviewRating: avgReviewRating,
      imdbRating: movie.rating
    };
  }
  return null;
}
