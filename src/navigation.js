trendingBtn.addEventListener("click", () => {
  location.hash = "#trends";
});

searchFormBtn.addEventListener("click", () => {
  location.hash = "#search=" + searchFormInput.value;
});
searchFormInput.addEventListener("keypress", (event) => {
  if (event.keyCode === 13) {
    location.hash = "#search=" + searchFormInput.value;
    event.preventDefault();
  }
});

arrowBtn.addEventListener("click", () => {
  history.back();
  location.hash = "#home";
});

window.addEventListener("DOMContentLoaded", navigator, false);
window.addEventListener("hashchange", navigator, false);

function navigator() {
  if (location.hash.startsWith("#trends")) {
    trendsPage();
  } else if (location.hash.startsWith("#search=")) {
    searchPage();
  } else if (location.hash.startsWith("#movie=")) {
    moviePage();
  } else if (location.hash.startsWith("#category=")) {
    categoryPage();
  } else {
    homePage();
  }

  window.scrollTo({top:0});
  // document.body.scrollTop = 0;

}

function homePage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.add("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerTitle.classList.remove("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  //Secciones
  trendingPreviewSection.classList.remove("inactive");
  categoriesPreviewSection.classList.remove("inactive");

  genericSection.classList.add("inactive");
  movieDetailSection.classList.add("inactive");

  getTrendingMoviesPreview();
  getCategoriesPreview();
}

function categoryPage() {
  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerCategoryTitle.classList.remove("inactive");
  headerTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  //Secciones
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");

  const [, categoryData] = location.hash.split("=");
  const [categoryIdHash, categoryNameHash] = categoryData.split("&");

  const categoryNameHash_fixed = categoryNameHash.replaceAll("%20", " ");

  headerCategoryTitle.innerHTML = categoryNameHash_fixed;
  getMoviesByCategory(categoryIdHash);
}

function moviePage() {
  console.log("PELICULA");

  headerSection.classList.add("header-container--long");
  // headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.add("header-arrow--white");
  headerTitle.classList.add("inactive");
  headerCategoryTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  //Secciones
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");
  genericSection.classList.add("inactive");
  movieDetailSection.classList.remove("inactive");

  const [, movieData] = location.hash.split("=");
  const [movieId, movieName] = movieData.split("&");
  const movieNameFixed = movieName.replaceAll('%20', ' ')
  console.log(movieId, movieNameFixed)

  getMovieById(movieId);
}

function searchPage() {
  console.log("BUSCADOR");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerCategoryTitle.classList.add("inactive");
  headerTitle.classList.add("inactive");
  searchForm.classList.remove("inactive");

  //Secciones
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  //#search, 'platzi'
  const [, query] = location.hash.split("=");

  getMoviesBySearch(query);
}

function trendsPage() {
  console.log("TENDENCIAS");

  headerSection.classList.remove("header-container--long");
  headerSection.style.background = "";
  arrowBtn.classList.remove("inactive");
  arrowBtn.classList.remove("header-arrow--white");
  headerCategoryTitle.classList.remove("inactive");
  headerCategoryTitle.innerHTML = "Tendencias";
  headerTitle.classList.add("inactive");
  searchForm.classList.add("inactive");

  //Secciones
  trendingPreviewSection.classList.add("inactive");
  categoriesPreviewSection.classList.add("inactive");

  genericSection.classList.remove("inactive");
  movieDetailSection.classList.add("inactive");
  getTrendingMovies();
}
