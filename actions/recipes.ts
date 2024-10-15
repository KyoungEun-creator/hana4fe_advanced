'use server';

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

export const saveRecipe = (
  recipeId: number,
  title: string,
  tags: string[],
  ingredients: string[],
  steps: string[]
) => {
  const book = recipes.find((recipe) => recipe.id === recipeId);
  if (!book) return Response.json({ code: 404, message: 'Not Found' });

  book.title = title;
  book.tags = tags;
  book.ingredients = ingredients;
  book.steps = steps;

  return book;
};
