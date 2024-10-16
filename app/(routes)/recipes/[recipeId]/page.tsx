'use client';

import { BellAlertIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  deleteRecipeFromLocalStorage,
  getRecipeFromLocalStorage,
  saveRecipeToLocalStorage,
} from '@/lib/localStorage';
import { TRecipe } from '@/lib/types';
import NotFoundRecipe from '../not-found';

export default function Recipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const Router = useRouter();
  const recipe = getRecipeFromLocalStorage(+recipeId);

  const stepsLength = recipe?.steps.length || 0;

  const [timers, setTimers] = useState<(number | null)[]>(
    Array(stepsLength).fill(null)
  );
  const [remainingTimes, setRemainingTimes] = useState<(number | null)[]>(
    Array(stepsLength).fill(null)
  );
  const [inputValues, setInputValues] = useState<(number | '')[]>(
    Array(stepsLength).fill('')
  );

  // 레시피 삭제 버튼
  const handleDelete = () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteRecipeFromLocalStorage(+recipeId);
      Router.push('/recipes');
    }
  };

  const handleInputChange = (stepIndex: number, value: string) => {
    const updatedInputValues = [...inputValues];
    updatedInputValues[stepIndex] = value === '' ? '' : parseInt(value, 10);
    setInputValues(updatedInputValues);
  };

  const handleStartTimer = (stepIndex: number) => {
    const seconds = inputValues[stepIndex];
    if (typeof seconds !== 'number' || seconds <= 0) return;

    const updatedTimers = [...timers];
    const updatedRemainingTimes = [...remainingTimes];

    updatedTimers[stepIndex] = seconds;
    updatedRemainingTimes[stepIndex] = seconds;

    setTimers(updatedTimers);
    setRemainingTimes(updatedRemainingTimes);
  };

  useEffect(() => {
    if (!recipe) return;

    const intervalIds: NodeJS.Timeout[] = [];

    remainingTimes.forEach((remainingTime, index) => {
      if (remainingTime === null) return;

      if (remainingTime === 0) {
        alert(`단계 ${index + 1} 타이머가 종료되었습니다!`);

        setRemainingTimes((prev) => {
          const newTimes = [...prev];
          newTimes[index] = null;
          return newTimes;
        });
        setInputValues((prev) => {
          const newValues = [...prev];
          newValues[index] = '';
          return newValues;
        });

        return;
      }

      const intervalId = setInterval(() => {
        setRemainingTimes((prev) => {
          const newTimes = [...prev];
          if (newTimes[index] !== null) {
            newTimes[index] = newTimes[index]! - 1;
          }
          return newTimes;
        });
      }, 1000);

      intervalIds.push(intervalId);
    });

    // cleanup 함수로 각 타이머를 정리
    return () => intervalIds.forEach(clearInterval);
  }, [remainingTimes, recipe]);

  if (!recipe) return <NotFoundRecipe />;

  // 버전 복원 함수
  function restoreVersion(recipeId: number, versionIndex: number) {
    const storedRecipes = localStorage.getItem('recipes');
    const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

    const recipe = recipes.find((recipe: TRecipe) => recipe.id === recipeId);

    if (recipe && recipe.versions[versionIndex]) {
      const previousVersion = recipe.versions[versionIndex].recipe;
      saveRecipeToLocalStorage(recipeId, previousVersion); // 이전 버전으로 레시피 저장
    }
  }

  return (
    <div className='w-full space-y-4'>
      <h1 className='text-3xl font-extrabold my-3'>{recipe?.title}</h1>

      {/* 조리 과정 */}
      <article>
        <div className='font-bold text-xl'>조리과정</div>
        <ol className='list-decimal ml-5'>
          {recipe?.steps.map((step, index) => (
            <li key={index}>
              {step}
              <div className='flex gap-4 mt-2'>
                <input
                  type='number'
                  placeholder='시간(초)'
                  className='rounded px-2 text-black'
                  value={inputValues[index] === '' ? '' : inputValues[index]}
                  onChange={(e) =>
                    handleInputChange(index, e.currentTarget.value)
                  }
                />
                <button
                  className='flex items-center gap-3 bg-blue-700 rounded px-3 py-2'
                  onClick={() => handleStartTimer(index)}
                  disabled={remainingTimes[index] !== null}
                >
                  <BellAlertIcon className='w-4' />
                  타이머 시작
                </button>
                {remainingTimes[index] !== null && (
                  <div className='mt-2 text-red-500'>
                    남은 시간: {remainingTimes[index]}초
                  </div>
                )}
              </div>
            </li>
          ))}
        </ol>
      </article>

      {/* 태그 */}
      <article>
        <ul className='flex'>
          {recipe?.tags.map((tag) => (
            <li key={tag}>
              <span className='bg-gray-300 px-2 py-1 mr-2 text-gray-800 rounded'>
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </article>

      {/* 재료 */}
      <article>
        <div className='font-bold text-xl'>재료</div>
        {recipe?.ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </article>

      {/* 수정 기록 */}
      <article className='font-bold text-xl'>
        <div className='font-bold text-xl'>수정기록</div>
        <ul>
          {recipe.versions.map((version, index) => (
            <li key={index} className='space-x-4 mb-2'>
              <button
                onClick={() => restoreVersion(+recipeId, index)}
                className='text-sm hover:text-purple-600'
              >
                {new Date(version.date).toLocaleString()}
              </button>
            </li>
          ))}
        </ul>
      </article>

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
