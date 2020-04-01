import {
    fetchRecipes,
    createRecipe,
    updateRecipe,
    removeRecipe
} from "./recipes";
import { renderRecipes } from "./views";

const createBtn = document.querySelector("#create-recipe");
const titleInput = document.querySelector("#title");
const instructionsInput = document.querySelector("#instructions");

renderRecipes(); // Initial rendering

// Handle creating a new recipe
createBtn.addEventListener("click", e => {
    e.preventDefault();
    const title = titleInput.value;
    const instructions = instructionsInput.value;
    if (title.length > 0 && instructions.length > 0) {
        createRecipe(title, instructions);
        renderRecipes();

        titleInput.value = "";
        instructionsInput.value = "";
    }
});
