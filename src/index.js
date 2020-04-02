import {
    fetchRecipes,
    createRecipe,
    updateRecipe,
    removeRecipe
} from "./recipes";
import { renderRecipes } from "./views";

const createBtn = document.querySelector("#create-recipe");

renderRecipes(); // Initial rendering

// Handle creating a new recipe
createBtn.addEventListener("click", e => {
    e.preventDefault();
    const newRecipeId = createRecipe();
    location.assign(`/edit.html#${newRecipeId}`);
});
