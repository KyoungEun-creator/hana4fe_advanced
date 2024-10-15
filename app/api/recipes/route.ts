// book의 목록 정보
import { NextRequest } from 'next/server';
import { recipes } from './recipedata';

export function GET(req: NextRequest) {
  return Response.json(recipes);
}

export async function POST(req: Request) {
  const { title, tags, ingredients, steps } = await req.json();

  const id = Math.max(...recipes.map(({ id }) => id), 0) + 1;
  const newRecipe = { id, title, tags, ingredients, steps };
  recipes.push(newRecipe);

  return Response.json(newRecipe);
}
