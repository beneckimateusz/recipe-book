import { removeRecipe, updateRecipe } from "./recipes";
import { initializeEditPage, renderIngredients } from "./views";
import { addIngredient } from "./ingredients";

const recipeId = location.hash.substring(1);

const titleInput = document.querySelector("#title");
const imageInput = document.querySelector("#image");
const instructionsInput = document.querySelector("#instructions");
const ingredientInput = document.querySelector("#ingredient-name");

const addIngredientBtn = document.querySelector("#add-ingredient");
const removeBtn = document.querySelector("#remove-recipe");
const goBackBtn = document.querySelector("#go-back");

initializeEditPage(recipeId); // initial rendering
renderIngredients(recipeId);

// Handle recipe removal
removeBtn.addEventListener("click", (e) => {
    removeRecipe(recipeId);
    location.assign("/index.html");
});

// Handle returning to the main page
goBackBtn.addEventListener("click", (e) => {
    location.assign("/index.html");
});

// Handle title update
titleInput.addEventListener("input", (e) => {
    updateRecipe(recipeId, { title: e.target.value });
});

// Handle image update
imageInput.addEventListener("input", (e) => {
    updateRecipe(recipeId, { image: e.target.value });
});

// Handle instructions update
instructionsInput.addEventListener("input", (e) => {
    updateRecipe(recipeId, { instructions: e.target.value });
});

// Handle adding an ingredient
addIngredientBtn.addEventListener("click", (e) => {
    if (ingredientInput.value.length > 0) {
        addIngredient(recipeId, ingredientInput.value);
        ingredientInput.value = ""; // clear the input for future use
    }
});
