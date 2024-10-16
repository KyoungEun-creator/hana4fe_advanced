import { type TRecipe, TRecipeVersion } from './types';

export function saveRecipeToLocalStorage(
  recipeId: number,
  updatedRecipe: TRecipe
) {
  const storedRecipes = localStorage.getItem('recipes');
  const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

  const existingRecipe = recipes.find(
    (recipe: TRecipe) => recipe.id === recipeId
  );

  if (existingRecipe) {
    const newVersion: TRecipeVersion = {
      date: new Date().toISOString(), // 현재 날짜
      recipe: existingRecipe, // 현재 레시피
    };

    const updatedRecipeWithVersion = {
      ...updatedRecipe,
      versions: [...existingRecipe.versions, newVersion],
    };

    const updatedRecipes = recipes.map((recipe: TRecipe) =>
      recipe.id === recipeId ? updatedRecipeWithVersion : recipe
    );

    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
  }
}

export function getRecipeFromLocalStorage(recipeId: number) {
  const storedRecipes = localStorage.getItem('recipes');
  if (!storedRecipes) return null;

  const recipes = JSON.parse(storedRecipes) as TRecipe[];

  return recipes.find(({ id }) => id === recipeId) || null;
}

export function deleteRecipeFromLocalStorage(recipeId: number) {
  const storedRecipes = localStorage.getItem('recipes');
  if (!storedRecipes) return;

  const recipes = JSON.parse(storedRecipes) as TRecipe[];
  const updatedRecipes = recipes.filter(({ id }) => id !== recipeId);
  localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
}
