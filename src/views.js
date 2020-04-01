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
    recipeEl.classList.add("recpies__recipe");
    recipeEl.innerHTML = `
    <p>
        Title: ${recipe.title}, 
        createdAt: ${generateCreated(recipe.createdAt)},
        updatedAt: ${generateLastEdited(recipe.updatedAt)}
    </p>
    `;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("button", "button--danger");
    removeBtn.textContent = "X";
    removeBtn.addEventListener("click", e => {
        removeRecipe(recipe._id);
        renderRecipes();
    });
    recipeEl.appendChild(removeBtn);
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

export { renderRecipes };
