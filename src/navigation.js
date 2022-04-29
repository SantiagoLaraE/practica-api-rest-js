import {getTrendingMoviesPreview, getCategoriesPreview} from './main.js';

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
}
function homePage(){
    getTrendingMoviesPreview();
    getCategoriesPreview();
};

function trendsPage(){
    console.log('TENDENCIAS');
};

function searchPage(){
    console.log('BUSCADOR');
};

function moviePage(){
    console.log('PELICULA');

};

function categoryPage(){
    console.log('CATEGORIA');
};


