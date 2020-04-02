import {
    fetchRecipes,
    createRecipe,
    updateRecipe,
    removeRecipe
} from "./recipes";
import moment from "moment";

const recipesEl = document.querySelector(".recipes");

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
    // const removeBtn = document.createElement("button");
    // removeBtn.classList.add("button", "button--danger");
    // removeBtn.textContent = "X";
    // removeBtn.addEventListener("click", e => {
    //     removeRecipe(recipe._id);
    //     renderRecipes();
    // });
    // recipeEl.appendChild(removeBtn);
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

// Initialize edit page with info about specific recipe
const initializeEditPage = recipeId => {
    const titleInput = document.querySelector("#title");
    const instructionsInput = document.querySelector("#instructions");

    const recipes = fetchRecipes();
    const recipe = recipes.find(recipe => recipe._id === recipeId);
    if (!recipe) {
        location.assign("/index.html");
        return;
    }

    titleInput.value = recipe.title;
    instructionsInput.value = recipe.instructions;
};

export { renderRecipes, initializeEditPage };
