'use client';

import { TRecipe } from '@/app/api/recipes/recipedata';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import NotFoundRecipe from '../not-found';

function getRecipeFromLocalStorage(recipeId: number) {
  const storedRecipes = localStorage.getItem('recipes');
  if (!storedRecipes) return null;

  const recipes = JSON.parse(storedRecipes) as TRecipe[];

  return recipes.find(({ id }) => id === recipeId) || null;
}

function deleteRecipeFromLocalStorage(recipeId: number) {
  const storedRecipes = localStorage.getItem('recipes');
  if (!storedRecipes) return;

  const recipes = JSON.parse(storedRecipes) as TRecipe[];
  const updatedRecipes = recipes.filter(({ id }) => id !== recipeId);
  localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
}

export default function Recipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const Router = useRouter();
  const recipe = getRecipeFromLocalStorage(+recipeId);

  if (!recipe) return NotFoundRecipe();

  const handleDelete = () => {
    if (confirm('Are you sure?')) {
      deleteRecipeFromLocalStorage(+recipeId);
      Router.push('/recipes');
    }
  };

  return (
    <div className='w-full space-y-4'>
      <h1 className='text-3xl font-extrabold my-3'>{recipe.title}</h1>

      {/* 조리 과정 */}
      <article className=''>
        <div className='font-bold text-xl'>조리과정</div>
        <ol className='list-decimal ml-5'>
          {recipe.steps.map((step) => (
            <>
              <li key={step}>{step}</li>
              <div className='flex gap-2'>
                <input
                  type='number'
                  placeholder='시간(초)'
                  className='rounded px-2'
                />
                <button className='bg-blue-700 rounded px-3 py-2'>
                  타이머 시작
                </button>
              </div>
            </>
          ))}
        </ol>
      </article>

      {/* 태그 */}
      <article className=''>
        <ul className='flex'>
          {recipe.tags.map((tag) => (
            <li key={tag}>
              <span className=' bg-gray-300 px-2 py-1 mr-2 text-gray-800 rounded'>
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </article>

      {/* 재료 */}
      <article className=''>
        <div className='font-bold text-xl'>재료</div>
        {recipe.ingredients.map((recipe) => (
          <li key={recipe}>{recipe}</li>
        ))}
      </article>

      {/* 조리 과정 */}
      <article className=''>
        <div className='font-bold text-xl'>조리과정</div>
        <ol className='list-decimal ml-5'>
          {recipe.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>

      {/* 수정 기록 */}
      <article className='font-bold text-xl'>수정기록</article>

      {/* 수정/삭제/목록으로 */}
      <article className='space-x-3'>
        <button className='text-black bg-yellow-500 rounded p-3'>
          <Link href={`/recipes/${recipeId}/edit`}>수정</Link>
        </button>

        <button
          className='text-black bg-pink-500 rounded p-3'
          onClick={handleDelete}
        >
          삭제
        </button>
        <button className='text-black bg-gray-500 rounded p-3'>
          <Link href='/recipes'>목록으로</Link>
        </button>
      </article>
    </div>
  );
}
