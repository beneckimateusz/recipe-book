import { fetchRecipes, getRecipe, saveRecipes } from "./recipes";
import { removeIngredient } from "./ingredients";
import moment from "moment";

const recipesEl = document.querySelector(".recipes");
const ingredientsEl = document.querySelector(".ingredients");

const generateCreated = (timestamp) => {
    return `Created ${moment(timestamp).fromNow()}`;
};

const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`;
};

// Create a new div with given recipe details
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement("div");
    recipeEl.classList.add("recipes__recipe");
    recipeEl.innerHTML = `
    Title: ${recipe.title}, 
    createdAt: ${generateCreated(recipe.createdAt)},
    updatedAt: ${generateLastEdited(recipe.updatedAt)}
    `;

    recipeEl.addEventListener("click", (e) => {
        location.assign(`/edit.html#${recipe._id}`);
    });
    return recipeEl;
};

// Render recipes stored in localStorage and create recipe button
const renderRecipes = () => {
    recipesEl.innerHTML = ""; // Erase previous content
    const recipes = fetchRecipes();
    recipes.forEach((recipe) => {
        recipesEl.appendChild(generateRecipeDOM(recipe));
    });
};

// Create an element representing an ingredient for a given recipe
const generateIngredientDOM = (recipe, ingredient) => {
    const ingredientEl = document.createElement("div");
    ingredientEl.classList.add("ingredients__ingredient");
    ingredientEl.innerHTML = `
    <input type="checkbox" name="${ingredient.name}">
    <p>${ingredient.name}</p>
    `;

    const collectedChbox = ingredientEl.querySelector("input");
    collectedChbox.checked = ingredient.collected;
    collectedChbox.addEventListener("change", (e) => {
        ingredient.collected = e.target.checked;
        saveRecipes();
    });

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("button", "button--danger");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", (e) => {
        removeIngredient(recipe, ingredient.name);
    });
    ingredientEl.appendChild(removeBtn);

    return ingredientEl;
};

// Loop through the ingredients for a given recipe and render them to DOM
const renderIngredients = (recipeId) => {
    ingredientsEl.innerHTML = "";

    const recipe = getRecipe(recipeId);
    if (recipe) {
        recipe.ingredients.forEach((ingredient) => {
            ingredientsEl.appendChild(
                generateIngredientDOM(recipe, ingredient)
            );
        });
    }
};

// Initialize edit page with title and instructions for the recipe being edited
const initializeEditPage = (recipeId) => {
    const titleInput = document.querySelector("#title");
    const instructionsInput = document.querySelector("#instructions");

    const recipe = getRecipe(recipeId);
    if (!recipe) {
        location.assign("/index.html");
        return;
    }

    titleInput.value = recipe.title;
    instructionsInput.value = recipe.instructions;
};

export { renderRecipes, initializeEditPage, renderIngredients };
