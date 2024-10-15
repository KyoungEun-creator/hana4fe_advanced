'use client';

import { getRecipe, update } from '@/actions/recipes';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function EditRecipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const tagRef = useRef<HTMLInputElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const stepRef = useRef<HTMLInputElement>(null);

  // 레시피 데이터 가져오기
  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await getRecipe(+recipeId); // API에서 레시피 가져오기
      setTitle(recipe.title);
      setIngredients(recipe.ingredients);
      setSteps(recipe.steps);
      setTags(recipe.tags);

      // localStorage에 저장
      localStorage.setItem(`recipe_${recipeId}`, JSON.stringify(recipe));
    };

    fetchRecipe().catch(console.error);
  }, [recipeId]);

  useEffect(() => {
    // localStorage에서 데이터 가져오기
    const storedRecipe = localStorage.getItem(`recipe_${recipeId}`);
    if (storedRecipe) {
      const { title, ingredients, steps, tags } = JSON.parse(storedRecipe);
      setTitle(title);
      setIngredients(ingredients);
      setSteps(steps);
      setTags(tags);
    }
  }, [recipeId]);

  async function saveRecipe(formData: FormData) {
    const title = formData.get('title');
    const tag = formData.getAll('tag') as string[];
    const ingredient = formData.getAll('ingredient') as string[];
    const step = formData.getAll('step') as string[];

    await update(+recipeId, String(title), tag, ingredient, step);

    // localStorage에 저장
    localStorage.setItem(
      `recipe_${recipeId}`,
      JSON.stringify({
        title,
        tags: tag,
        ingredients: ingredient,
        steps: step,
      })
    );

    redirect(`/recipes/${recipeId}`);
  }

  const handleRemoveTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const handleRemoveStep = (index: number) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  return (
    <div className='w-full'>
      <h1 className='text-3xl font-extrabold my-4'>레시피 수정</h1>

      <form action={saveRecipe} className='space-y-5'>
        <div className='flex flex-col'>
          <label htmlFor='title' className='font-bold text-xl'>
            레시피 제목
          </label>
          <input
            name='title'
            type='text'
            value={title} // 상태에서 제목을 가져옴
            onChange={(e) => setTitle(e.target.value)} // 상태 업데이트
            className='border text-black p-2 rounded'
          />
        </div>

        {/* 태그 목록 */}
        <div className='flex flex-col'>
          <label htmlFor='tag' className='font-bold text-xl'>
            태그 목록
          </label>
          <input
            ref={tagRef}
            type='text'
            placeholder='태그를 입력하세요.'
            className='border text-black p-2 rounded'
          />
          <button
            type='button'
            onClick={() => {
              if (tagRef.current && tagRef.current.value) {
                const newval = tagRef.current?.value;
                setTags((prevTags) => [...prevTags, newval]);
                tagRef.current.value = '';
              }
            }}
            className='bg-green-300 text-black px-3 py-2 rounded'
          >
            추가
          </button>

          {tags.map((tag, index) => (
            <div key={index} className='flex gap-3'>
              <span>{tag}</span>
              <button
                onClick={() => handleRemoveTag(index)}
                className='text-red-500'
              >
                삭제
              </button>
            </div>
          ))}
        </div>

        {/* 재료 목록 */}
        <div className='flex flex-col'>
          <label htmlFor='ingredient' className='font-bold text-xl'>
            재료 목록
          </label>
          <input
            ref={ingredientRef}
            type='text'
            placeholder='재료를 입력하세요.'
            className='border text-black p-2 rounded'
          />
          <button
            type='button'
            onClick={() => {
              if (ingredientRef.current && ingredientRef.current.value) {
                const newval = ingredientRef.current?.value;
                setIngredients((prevIngredients) => [
                  ...prevIngredients,
                  newval,
                ]);
                ingredientRef.current.value = ''; // 입력 필드 비우기
              }
            }}
            className='bg-green-300 text-black px-3 py-2 rounded'
          >
            추가
          </button>

          {ingredients.map((ingredient, index) => (
            <div key={index} className='flex gap-3'>
              <li>{ingredient}</li>
              <button
                onClick={() => handleRemoveIngredient(index)}
                className='text-red-500'
              >
                삭제
              </button>
            </div>
          ))}
        </div>

        {/* 조리 과정 */}
        <div className='flex flex-col'>
          <label htmlFor='step' className='font-bold text-xl'>
            조리 과정
          </label>
          <input
            ref={stepRef}
            type='text'
            placeholder='조리 과정을 입력하세요.'
            className='border text-black p-2 rounded'
          />
          <button
            type='button'
            onClick={() => {
              if (stepRef.current?.value) {
                const newval = stepRef.current?.value;
                setSteps((prevSteps) => [...prevSteps, newval]);
                stepRef.current.value = ''; // 입력 필드 비우기
              }
            }}
            className='bg-green-300 text-black px-3 py-2 rounded'
          >
            추가
          </button>

          <ol>
            {steps.map((step, index) => (
              <div key={index} className='flex gap-3'>
                <li>{step}</li>
                <button
                  onClick={() => handleRemoveStep(index)}
                  className='text-red-500'
                >
                  삭제
                </button>
              </div>
            ))}
          </ol>
        </div>

        <div className='space-x-4'>
          <button type='submit' className='bg-blue-400 p-3 rounded'>
            레시피 수정
          </button>
          <Link href={'/recipes'}>
            <button type='button' className='bg-pink-400 p-3 rounded'>
              목록으로
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
}
