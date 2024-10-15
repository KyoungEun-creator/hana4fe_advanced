'use client';

import { BellAlertIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  deleteRecipeFromLocalStorage,
  getRecipeFromLocalStorage,
} from '@/lib/localStorage';
import NotFoundRecipe from '../not-found';

export default function Recipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const Router = useRouter();
  const recipe = getRecipeFromLocalStorage(+recipeId);

  const [timer, setTimer] = useState<number | null>(null);
  const [remainingTime, setRemainingTime] = useState<number | null>(null);

  useEffect(() => {
    if (remainingTime === null || !recipe) return;

    if (remainingTime === 0) {
      alert('타이머가 종료되었습니다!');
      setRemainingTime(null);
      return;
    }

    const intervalId = setInterval(() => {
      setRemainingTime((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [remainingTime, recipe]);

  if (!recipe) return NotFoundRecipe();

  // 레시피 삭제 버튼
  const handleDelete = () => {
    if (confirm('Are you sure?')) {
      deleteRecipeFromLocalStorage(+recipeId);
      Router.push('/recipes');
    }
  };

  const handleStartTimer = (seconds: number) => {
    if (seconds <= 0) return;
    setRemainingTime(seconds);
    setTimer(seconds);
  };

  return (
    <div className='w-full space-y-4'>
      <h1 className='text-3xl font-extrabold my-3'>{recipe.title}</h1>

      {/* 조리 과정 */}
      <article className=''>
        <div className='font-bold text-xl'>조리과정</div>
        <ol className='list-decimal ml-5'>
          {recipe.steps.map((step: string) => (
            <>
              <li key={step}>{step}</li>
              <div className='flex gap-4'>
                <input
                  type='number'
                  placeholder='시간(초)'
                  className='rounded px-2 text-black'
                  onChange={(e) => handleStartTimer(+e.currentTarget.value)}
                />
                <button
                  className='flex items-center gap-3 bg-blue-700 rounded px-3 py-2'
                  onClick={() => handleStartTimer(Number(timer))}
                  disabled={remainingTime !== null}
                >
                  <BellAlertIcon className='w-4' />
                  타이머 시작
                </button>
                {remainingTime !== null && (
                  <div className='mt-2 text-red-500'>
                    남은 시간: {remainingTime}초
                  </div>
                )}
              </div>
            </>
          ))}
        </ol>
      </article>

      {/* 태그 */}
      <article className=''>
        <ul className='flex'>
          {recipe.tags.map((tag: string) => (
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
        {recipe.ingredients.map((recipe: string) => (
          <li key={recipe}>{recipe}</li>
        ))}
      </article>

      {/* 조리 과정 */}
      <article className=''>
        <div className='font-bold text-xl'>조리과정</div>
        <ol className='list-decimal ml-5'>
          {recipe.steps.map((step: string) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      </article>

      {/* 수정 기록 */}
      <article className='font-bold text-xl'>수정기록</article>

      {/* 수정/삭제/목록으로 */}
      <article className='space-x-3'>
        <Link href={`/recipes/${recipeId}/edit`}>
          <button className='text-black bg-yellow-500 rounded p-3'>
            수정기록
          </button>
        </Link>

        <button
          className='text-black bg-pink-500 rounded p-3'
          onClick={handleDelete}
        >
          삭제
        </button>
        <Link href='/recipes'>
          <button className='text-black bg-gray-500 rounded p-3'>
            목록으로
          </button>
        </Link>
      </article>
    </div>
  );
}
