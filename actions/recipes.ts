// 'use server';
import { recipes, TRecipe } from '@/app/api/recipes/recipedata';
import { redirect } from 'next/navigation';

export const getRecipe = (recipeId: number) => {
  const book = recipes.find(({ id }) => id === +recipeId) as TRecipe;
  return book;
};

export const delRecipe = (recipeId: number) => {
  const idx = recipes.findIndex((recipe) => recipe.id === +recipeId);
  if (idx === -1) return Response.json({ code: 404, message: 'Not Found' });

  recipes.splice(idx, 1);
  redirect('/recipes');
};

export const saveNew = (
  recipeId: number,
  title: string,
  tags: string[],
  ingredients: string[],
  steps: string[]
) => {
  const newRecipe: TRecipe = {
    id: recipeId,
    title,
    tags,
    ingredients,
    steps,
  };

  recipes.push(newRecipe);

  return newRecipe;
};

export const update = (
  recipeId: number,
  title: string,
  tags: string[],
  ingredients: string[],
  steps: string[]
) => {
  const recipe = recipes.find((recipe) => recipe.id === recipeId);
  if (!recipe) return Response.json({ code: 404, message: 'Not Found' });

  recipe.title = title;
  recipe.tags = tags;
  recipe.ingredients = ingredients;
  recipe.steps = steps;

  return recipe;
};
