async function loadMovies() {
    try {
        const res = await fetch("../backend/fetchmovies.php"); // no http, just filename
        const data = await res.json();
        return data.data
    } catch (err) {
        console.error(err);
    }
}


async function getMovieById(id) {
  try {

    const res = await fetch(`../backend/fetchmovieid.php?id=${id}`);
    const json = await res.json();
    return json.data;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
}

// Function to get all movies
async function getAllMovies() {
  const movies = await loadMovies()
  return movies;
}



