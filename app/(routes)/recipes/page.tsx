'use client';

import { TRecipe } from '@/app/api/recipes/recipedata';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Recipes() {
  const [recipes, setRecipes] = useState<TRecipe[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      // 로컬 스토리지에서 데이터 가져오기
      const storedRecipes = localStorage.getItem('recipes');
      if (storedRecipes) {
        const parsedRecipes = JSON.parse(storedRecipes) as TRecipe[];
        setRecipes(parsedRecipes);
      } else {
        setError(new Error('저장된 레시피가 없습니다.'));
      }
    } catch (err) {
      setError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (error) return <div className='text-red-500'>{error.message}</div>;

  return (
    <>
      {isLoading ? (
        <>is loading..</>
      ) : (
        <>
          <ul className='w-full'>
            {recipes?.map(({ id, title, tags }) => (
              <li key={id}>
                <div className='rounded border shadow p-3 m-3 h-36 flex flex-col justify-around'>
                  {/* 레시피 타이틀 */}
                  <div className='text-2xl font-extrabold'>{title}</div>
                  {/* 태그 모음 */}
                  <div>
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className='bg-gray-300 px-2 py-1 mr-2 text-gray-800 rounded'
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  {/* 자세히 보기 버튼 */}
                  <Link
                    href={`/recipes/${id}`}
                    className='text-center bg-green-800 rounded py-2'
                  >
                    자세히보기
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
