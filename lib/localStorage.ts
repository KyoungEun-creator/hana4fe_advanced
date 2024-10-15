import { TRecipe } from '@/app/(routes)/recipes/page';

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
