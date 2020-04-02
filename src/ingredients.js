import { getRecipe, saveRecipes } from "./recipes";
import { renderIngredients } from "./views";

const addIngredient = (recipeId, ingredientName) => {
    const recipe = getRecipe(recipeId);
    if (recipe) {
        recipe.ingredients.push({
            name: ingredientName,
            collected: false
        });
        saveRecipes();
        renderIngredients(recipeId);
    }
};

const removeIngredient = (recipeId, ingredientName) => {
    const recipe = getRecipe(recipeId);
    if (recipe) {
        const ingredientIndex = recipe.ingredients.findIndex(
            ingredient => ingredient.name === ingredientName
        );
        if (ingredientIndex > -1) {
            recipe.ingredients.splice(ingredientIndex, 1);
            saveRecipes();
            renderIngredients(recipeId);
        }
    }
};

const toggleCollected = (recipeId, ingredientName) => {};

export { addIngredient, removeIngredient };
