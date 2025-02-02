'use client';

import { BellAlertIcon } from '@heroicons/react/16/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  deleteRecipeFromLocalStorage,
  getRecipeFromLocalStorage,
} from '@/lib/localStorage';
import { TRecipe } from '@/lib/types';
import NotFoundRecipe from '../not-found';

export default function Recipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const Router = useRouter();
  const [recipe, setRecipe] = useState<TRecipe | null>(
    getRecipeFromLocalStorage(+recipeId)
  );
  const [selectedVersion, setSelectedVersion] = useState<number | null>(null);

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
        alert(
          `🔔${index + 1}단계 타이머가 종료되었습니다! 다음 단계로 넘어가세요🧚🏻‍♀️`
        );

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

    return () => intervalIds.forEach(clearInterval);
  }, [remainingTimes, recipe]);

  if (!recipe) return <NotFoundRecipe />;

  function restoreVersion(recipeId: number, versionIndex: number) {
    const storedRecipes = localStorage.getItem('recipes');
    const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

    const currentRecipe = recipes.find(
      (recipe: TRecipe) => recipe.id === recipeId
    );

    if (currentRecipe && currentRecipe.versions[versionIndex]) {
      const previousVersion = currentRecipe.versions[versionIndex].recipe;

      setRecipe(previousVersion);
      setSelectedVersion(versionIndex);
    }
  }

  function restoreLatestVersion(recipeId: number) {
    const latestRecipe = getRecipeFromLocalStorage(recipeId);
    if (latestRecipe) {
      setRecipe(latestRecipe);
      setSelectedVersion(null);
    }
  }

  return (
    <div className='w-full space-y-4'>
      <h1 className='border-2 rounded-lg border-orange-300 text-center py-3 text-3xl font-extrabold my-3'>
        {recipe?.title}
      </h1>

      {/* 태그 */}
      <article>
        <ul className='flex'>
          {recipe?.tags.map((tag) => (
            <li key={tag}>
              <span className='btn-small bg-gray-300 mr-2 text-gray-800'>
                {tag}
              </span>
            </li>
          ))}
        </ul>
      </article>

      {/* 조리 과정 */}
      <article>
        <div className='font-bold text-xl'>⏲️ 조리과정</div>
        {recipe.steps.length > 0 ? (
          <ol className='list-decimal ml-5'>
            {recipe?.steps.map((step, index) => (
              <li key={index}>
                {step}
                <div className='flex gap-4 mt-2'>
                  <input
                    type='number'
                    name='timerNum'
                    placeholder='시간(초)'
                    className='rounded px-2 text-black'
                    value={inputValues[index] === '' ? '' : inputValues[index]}
                    onChange={(e) =>
                      handleInputChange(index, e.currentTarget.value)
                    }
                  />
                  {remainingTimes[index] !== null ? (
                    <button
                      className='btn-default gap-3 bg-red-500'
                      onClick={() => handleStartTimer(index)}
                      disabled={remainingTimes[index] !== null}
                    >
                      <BellAlertIcon className='w-4' />
                      남은 시간: {remainingTimes[index]}초
                    </button>
                  ) : (
                    <button
                      className='btn-default gap-3 bg-blue-700'
                      onClick={() => handleStartTimer(index)}
                      disabled={remainingTimes[index] !== null}
                    >
                      <BellAlertIcon className='w-4' />
                      타이머 시작
                    </button>
                  )}
                </div>
              </li>
            ))}
          </ol>
        ) : (
          <div>(아직 조리과정을 입력하지 않았습니다.)</div>
        )}
      </article>

      {/* 재료 */}
      <article>
        <div className='font-bold text-xl'>🍴 재료</div>
        {recipe.ingredients.length > 0 ? (
          recipe.ingredients.map((ingredient) => (
            <li key={ingredient}>{ingredient}</li>
          ))
        ) : (
          <div>(아직 재료를 입력하지 않았습니다.)</div>
        )}
      </article>

      {/* 조리 과정 */}
      <article>
        <div className='font-bold text-xl'>🥣 조리과정</div>
        {recipe.steps.length > 0 ? (
          <ol className='list-decimal ml-5'>
            {recipe.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        ) : (
          <div>(아직 조리과정을 입력하지 않았습니다.)</div>
        )}
      </article>

      {/* 수정 기록 */}
      {selectedVersion === null && (
        <article className='font-bold text-xl'>
          <div className='font-bold text-xl'>📜 수정기록</div>
          {recipe.versions?.map((version, index) => (
            <li key={index} className='space-x-4 mb-1'>
              <button
                onClick={() => restoreVersion(+recipeId, index)}
                className='text-sm hover:text-orange-400'
              >
                {new Date(version.date).toLocaleString()}
              </button>
            </li>
          ))}
        </article>
      )}

      {/* 수정/삭제/목록으로 */}
      {selectedVersion === null ? (
        <article className='flex space-x-3'>
          <button className='btn-default text-black bg-purple-400'>
            <Link href={`/recipes/${recipeId}/edit`}>수정</Link>
          </button>

          <button
            className='btn-default text-black bg-yellow-400'
            onClick={handleDelete}
          >
            삭제
          </button>
          <button className='btn-default text-black bg-pink-400'>
            <Link href='/recipes'>목록으로</Link>
          </button>
        </article>
      ) : (
        <button
          onClick={() => restoreLatestVersion(+recipeId)}
          className='text-black bg-pink-500 rounded p-3'
        >
          최신 버전으로 돌아가기
        </button>
      )}
    </div>
  );
}
