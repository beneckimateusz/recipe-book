import { fetchRecipes, getRecipe } from "./recipes";
import { removeIngredient } from "./ingredients";
import moment from "moment";

const recipesEl = document.querySelector(".recipes");
const ingredientsEl = document.querySelector(".ingredients");

const generateCreated = timestamp => {
    return `Created ${moment(timestamp).fromNow()}`;
};

const generateLastEdited = timestamp => {
    return `Last edited ${moment(timestamp).fromNow()}`;
};

// Create a new div with a given recipe details
const generateRecipeDOM = recipe => {
    const recipeEl = document.createElement("div");
    recipeEl.classList.add("recipes__recipe");
    recipeEl.innerHTML = `
    Title: ${recipe.title}, 
    createdAt: ${generateCreated(recipe.createdAt)},
    updatedAt: ${generateLastEdited(recipe.updatedAt)}
    `;

    recipeEl.addEventListener("click", e => {
        location.assign(`/edit.html#${recipe._id}`);
    });
    return recipeEl;
};

// Render stored recpies and create recipe button
const renderRecipes = () => {
    recipesEl.innerHTML = ""; // Erase previous content
    const recipes = fetchRecipes();
    recipes.forEach(recipe => {
        recipesEl.appendChild(generateRecipeDOM(recipe));
    });
};

const generateIngredientDOM = (recipeId, ingredient) => {
    const ingredientEl = document.createElement("div");
    ingredientEl.classList.add("ingredients__ingredient");
    ingredientEl.innerHTML = `
    <p>${ingredient.name}</p>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("button", "button--danger");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", e => {
        removeIngredient(recipeId, ingredient.name);
    });
    ingredientEl.appendChild(removeBtn);

    return ingredientEl;
};

const renderIngredients = recipeId => {
    ingredientsEl.innerHTML = "";

    const recipe = getRecipe(recipeId);
    recipe.ingredients.forEach(ingredient => {
        ingredientsEl.appendChild(
            generateIngredientDOM(recipe._id, ingredient)
        );
    });
};

// Initialize edit page with info about specific recipe
const initializeEditPage = recipeId => {
    const titleInput = document.querySelector("#title");
    const instructionsInput = document.querySelector("#instructions");

    const recipe = getRecipe(recipeId);
    if (!recipe) {
        location.assign("/index.html");
        return;
    }

    titleInput.value = recipe.title;
    instructionsInput.value = recipe.instructions;
    renderIngredients(recipeId);
};

export { renderRecipes, initializeEditPage, renderIngredients };
