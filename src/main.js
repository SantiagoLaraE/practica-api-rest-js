const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  headers: {
    "Content-Type": "application/json;charset=utf-8",
  },
  params: {
    api_key: API_KEY,
  },
});

//Utils

function createMovies(movies, section) {
  let fragment = new DocumentFragment();
  movies.forEach((movie) => {
    const dataCategoryContainer = document.createElement("div");
    dataCategoryContainer.classList.add("movie-container");

    const imgMovie = document.createElement("img");
    imgMovie.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );
    imgMovie.setAttribute("alt", movie.title);
    imgMovie.classList.add("movie-img");

    dataCategoryContainer.appendChild(imgMovie);
    dataCategoryContainer.addEventListener("click", () => {
      location.hash = "#movie=" + movie.id;
    });

    fragment.appendChild(dataCategoryContainer);
  });

  section.innerHTML = "";
  section.appendChild(fragment);
}

function createCategories(categories, section) {
  let fragment = new DocumentFragment();

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    const categoryTitleText = document.createTextNode(category.name);
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.classList.add("category-title");

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);

    categoryContainer.addEventListener(
      "click",
      () => (location.hash = `#category=${category.id}-${category.name}`)
    );

    fragment.appendChild(categoryContainer);
  });
  section.innerHTML = "";
  section.appendChild(fragment);
}

//Llamados a la API

async function getTrendingMoviesPreview() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

  createMovies(movies, trendingMoviesPreviewList);
  createMovies(movies, genericSection);
}

async function getCategoriesPreview() {
  const { data } = await api("genre/movie/list");
  const categories = data.genres;
  createCategories(categories, categoriesPreviewList);
}

async function getMoviesByCategory(id) {
  const { data } = await api("discover/movie", {
    params: {
      with_genres: id,
    },
  });

  const categoryData = data.results;
  createMovies(categoryData, genericSection);
}

async function getMoviesBySearch(query) {
  const { data } = await api("search/movie", {
    params: {
      query: query,
    },
  });
  const movies = data.results;


  const fixedMovies = movies.filter((movie) => movie.poster_path != null);


  createMovies(fixedMovies, genericSection);
}
