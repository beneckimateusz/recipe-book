import { createRecipe } from "./recipes";
import { setFilters } from "./filter";
import { renderRecipes } from "./views";

const createBtn = document.querySelector("#create-recipe");
const searchInput = document.querySelector(".input--search");

renderRecipes(); // Initial rendering

// Handle creating a new recipe
createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const newRecipeId = createRecipe();
    location.assign(`/edit.html#${newRecipeId}`);
});

// Handle fitlering recipes by searchText
searchInput.addEventListener("input", (e) => {
    setFilters({ searchText: e.target.value.toLowerCase() });
    renderRecipes();
});
