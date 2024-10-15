import { getRecipe } from '@/actions/recipes';
import Link from 'next/link';
import DelRecipe from '@/components/DelRecipe';
import NotFoundRecipe from '../not-found';

export default async function Recipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const recipe = await getRecipe(+recipeId);
  if (!recipe) return NotFoundRecipe();

  return (
    <div className=' w-full space-y-4'>
      <h1 className='text-3xl font-extrabold my-3'>{recipe.title}</h1>

      {/* 조리 과정 */}
      <article className=''>
        <div className='font-bold text-xl'>조리과정</div>
        <ul>
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
        </ul>
      </article>

      {/* 태그 */}
      <article className=''>
        <ul className='flex'>
          {recipe.tags.map((tag) => (
            <li key={tag}>
              <span className='border bg-gray-300 px-2 py-1 mr-2 text-gray-800 rounded'>
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
        <ul>
          {recipe.steps.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ul>
      </article>

      {/* 수정 기록 */}
      <article className='font-bold text-xl'>수정기록</article>

      {/* 수정/삭제/목록으로 */}
      <article className='space-x-3'>
        <Link href='' className='text-black bg-yellow-500 rounded p-3'>
          수정
        </Link>
        <DelRecipe id={+recipeId} />
        <Link href='/recipes' className='text-black bg-gray-500 rounded p-3'>
          목록으로
        </Link>
      </article>
    </div>
  );
}
