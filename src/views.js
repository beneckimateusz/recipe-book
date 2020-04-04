import { fetchRecipes, getRecipe, saveRecipes } from "./recipes";
import { removeIngredient } from "./ingredients";
import { getFilters } from "./filter";
import moment from "moment";

const recipesEl = document.querySelector(".recipes__container");
const ingredientsEl = document.querySelector(".ingredients");

const generateCreated = (timestamp) => {
    return `Created ${moment(timestamp).fromNow()}`;
};

const generateLastEdited = (timestamp) => {
    return `Last edited ${moment(timestamp).fromNow()}`;
};

// Create a new div with given recipe details
const generateRecipeDOM = (recipe) => {
    const recipeEl = document.createElement("article");
    recipeEl.classList.add("recipes__recipe");
    recipeEl.innerHTML = `
    <h1 class="recipe__title">${recipe.title}</h1>
    <img class="image" src="${recipe.image}">
    <p class="recipe__caption">${recipe.instructions}</p>
    <p class="recipe__bottom">${generateCreated(recipe.createdAt)}</p>
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

    // Run fetched recipes through filters
    const { searchText } = getFilters();
    console.log(searchText);
    const filteredRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchText)
    );

    filteredRecipes.forEach((recipe) => {
        recipesEl.appendChild(generateRecipeDOM(recipe));
    });
};

// Create an element representing an ingredient for a given recipe
const generateIngredientDOM = (recipe, ingredient) => {
    const ingredientEl = document.createElement("div");
    ingredientEl.classList.add("ingredients__ingredient");
    ingredientEl.innerHTML = `
    <div class="ingredient-wrapper">
        <input type="checkbox">
        <span>${ingredient.name}</span>
    </div>
    <button class="button button--danger">remove</button>
    `;

    const collectedChbox = ingredientEl.querySelector("input");
    collectedChbox.checked = ingredient.collected;
    collectedChbox.addEventListener("change", (e) => {
        ingredient.collected = e.target.checked;
        saveRecipes();
    });

    const removeBtn = ingredientEl.querySelector("button");
    removeBtn.addEventListener("click", (e) => {
        removeIngredient(recipe, ingredient.name);
    });

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
    const imageInput = document.querySelector("#image");
    const createdAt = document.querySelector(".createdAt");
    const lastEdited = document.querySelector(".lastEdited");

    const recipe = getRecipe(recipeId);
    if (!recipe) {
        location.assign("/index.html");
        return;
    }

    createdAt.textContent = generateCreated(recipe.createdAt);
    lastEdited.textContent = generateLastEdited(recipe.lastEdited);
    titleInput.value = recipe.title;
    imageInput.value = recipe.image;
    instructionsInput.value = recipe.instructions;
};

export { renderRecipes, initializeEditPage, renderIngredients };
