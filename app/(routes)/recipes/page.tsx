'use client';

import { TRecipe } from '@/app/api/recipes/recipedata';
import { useFetch } from '@/hooks/fetch-hook';
import Link from 'next/link';

export default function Recipes() {
  const {
    data: recipes,
    isLoading,
    error,
  } = useFetch<TRecipe[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/recipes?q=111`,
    {},
    false
  );

  if (error) return <div className='text-red-500'>{error.message}</div>;

  return (
    <>
      {isLoading ? (
        <>is loading..</>
      ) : (
        <>
          <ul className=' w-full'>
            {recipes?.map(({ id, title, tags }) => (
              <li key={id}>
                <div className='rounded border shadow p-3 m-3 h-36 flex flex-col justify-around'>
                  {/* 레시피 타이틀 */}
                  <div className='text-2xl font-extrabold'>{title}</div>
                  {/* 태그 모음 */}
                  <div className=''>
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
