import { v4 as uuidv4 } from "uuid";
import moment from "moment";

let recipes = [];

// Load recipes from localStorage to initialize local recipes array
const loadRecipes = () => {
    const result = localStorage.getItem("recipes");
    recipes = result ? JSON.parse(result) : [];
};

// Save recipes array to localStorage
const saveRecipes = () => {
    localStorage.setItem("recipes", JSON.stringify(recipes));
};

// Fetch all of the recipes for external use
const fetchRecipes = () => recipes;

// Fetch a specific recipe for external use
const getRecipe = (recipeId) =>
    recipes.find((recipe) => recipe._id === recipeId);

// Create an empty new recipe
const createRecipe = (title = "", instructions = "") => {
    const newRecipe = {
        _id: uuidv4(),
        title,
        image: "/img/placeholder.jpg",
        instructions,
        ingredients: [],
        createdAt: moment().valueOf(),
        updatedAt: moment().valueOf(),
    };
    recipes.push(newRecipe); // Save new recipe locally
    saveRecipes(); // Save new recipe in localStorage
    return newRecipe._id;
};

// Update a recipe with a given recipeId
const updateRecipe = (recipeId, updates) => {
    const recipe = recipes.find((recipe) => recipe._id === recipeId);
    if (recipe) {
        // If such recipe actually exists
        if (typeof updates.title === "string") {
            // If title update value was provided
            recipe.title = updates.title;
            recipe.updatedAt = moment().valueOf();
        }
        if (typeof updates.instructions === "string") {
            // If instructions update value was provided
            recipe.instructions = updates.instructions;
            recipe.updatedAt = moment().valueOf();
        }
        if (typeof updates.image === "string") {
            // If image update value was provided
            recipe.image = updates.image;
            recipe.updatedAt = moment().valueOf();
        }
        // TODO: handle ingredients update
        saveRecipes();
    }
};

// Remove a recipe with a given recipeId: both locally and in localStorage
const removeRecipe = (recipeId) => {
    console.log(recipeId);
    const recipeIndex = recipes.findIndex((recipe) => recipe._id === recipeId);
    if (recipeIndex > -1) {
        // If such recipe actually exists
        recipes.splice(recipeIndex, 1);
        saveRecipes();
    }
};

// Perform the initial load
loadRecipes();

export {
    fetchRecipes,
    getRecipe,
    createRecipe,
    updateRecipe,
    removeRecipe,
    saveRecipes,
};
