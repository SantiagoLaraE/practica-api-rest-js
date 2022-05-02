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
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");
    movieContainer.addEventListener("click", () => {
      location.hash = `#movie=${movie.id}&${movie.title}`;
    });

    const imgMovie = document.createElement("img");
    imgMovie.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );
    imgMovie.setAttribute("alt", movie.title);
    imgMovie.classList.add("movie-img");

    movieContainer.appendChild(imgMovie);

    fragment.appendChild(movieContainer);
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
      () => (location.hash = `#category=${category.id}&${category.name}`)
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
}

async function getTrendingMovies() {
  const { data } = await api("trending/movie/day");
  const movies = data.results;

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

async function getMovieById(id) {
  const { data: movie } = await api("movie/" + id);
  

  const movieBackgroundImg = `https://image.tmdb.org/t/p/w400/${movie.poster_path}`;

  movieDetailTitle.textContent = movie.title;
  movieDetailDescription.textContent = movie.overview;
  movieDetailScore.textContent = movie.vote_average;

  headerSection.style.background = `linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.35) 19.27%,
    rgba(0, 0, 0, 0) 29.17%
  ),
  url(${movieBackgroundImg})`;

  
  createCategories(movie.genres, movieDetailCategoriesList);

  getRelatedMoviesbyId(id);
  
}

async function getRelatedMoviesbyId(id){
  const { data } = await api("movie/" + id + "/recommendations");
  const relatedMovies = data.results;
  
  createMovies(relatedMovies, relatedMoviesContainer);
}