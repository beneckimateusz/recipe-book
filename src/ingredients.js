import { getRecipe, saveRecipes } from "./recipes";
import { renderIngredients } from "./views";

// Add a new ingredient to given recipe's ingredients array
const addIngredient = (recipeId, ingredientName) => {
    const recipe = getRecipe(recipeId);
    if (recipe) {
        recipe.ingredients.push({
            name: ingredientName,
            collected: false,
        });
        saveRecipes();
        renderIngredients(recipeId);
    }
};

// Remove an ingredient from given recipe's ingredients array
const removeIngredient = (recipe, ingredientName) => {
    if (recipe) {
        const ingredientIndex = recipe.ingredients.findIndex(
            (ingredient) => ingredient.name === ingredientName
        );
        if (ingredientIndex > -1) {
            recipe.ingredients.splice(ingredientIndex, 1);
            saveRecipes();
            renderIngredients(recipe._id);
        }
    }
};

export { addIngredient, removeIngredient };
