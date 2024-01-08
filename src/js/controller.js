import * as model from './model.js';
import recipeView from './views/recipeView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

////////////////////////////////////

const controlRecipes = async () => {
  try {
    // Getting Id From URL
    const id = window.location.hash.slice(1);
    if (!id) return;

    // Render Spinner Before Loading Any Content
    recipeView.renderSpinner();

    // Loading Recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    // Rendering Recipe

    recipeView.render(model.state.recipe);

    // cutting from here
  } catch (err) {
    alert(err);
  }
};

// Loaading Events Method
/*
window.addEventListener('hashchange', controlRecipes);
window.addEventListener('load', controlRecipes);
*/

// Loading Events Method 2
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
