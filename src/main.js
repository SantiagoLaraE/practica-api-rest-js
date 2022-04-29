import API_KEY from "./secrets.js";

async function getTrendingMoviesPreview() {
  const res = await fetch(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=" + API_KEY
  );
  const data = await res.json();

  const movies = data.results;

  const trendingPreviewMoviesContainer = document.querySelector(
    "#trendingPreview .trendingPreview-movieList"
  );
  let fragment = new DocumentFragment();
  movies.forEach((movie) => {
    const movieContainer = document.createElement("div");
    movieContainer.classList.add("movie-container");

    const movieImg = document.createElement("img");
    movieImg.classList.add("movie-img");
    movieImg.setAttribute("alt", movie.title);
    movieImg.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
    );

    movieContainer.appendChild(movieImg);
    fragment.appendChild(movieContainer);
  });
  trendingPreviewMoviesContainer.appendChild(fragment);
}

getTrendingMoviesPreview();

async function getCategoriesPreview() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list?api_key=" + API_KEY
  );
  const data = await res.json();

  const categoriesPreviewContainer = document.querySelector(
    "#categoriesPreview .categoriesPreview-list"
  );
  const fragment = new DocumentFragment();

  const categories = data.genres;

  categories.forEach((category) => {
    const categoryContainer = document.createElement("div");
    categoryContainer.classList.add("category-container");

    const categoryTitle = document.createElement("h3");
    const categoryTitleText = document.createTextNode(category.name);
    categoryTitle.setAttribute("id", "id" + category.id);
    categoryTitle.classList.add("category-title");


    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    fragment.appendChild(categoryContainer);
    console.log(category);
  });
  categoriesPreviewContainer.appendChild(fragment);
}
getCategoriesPreview();
