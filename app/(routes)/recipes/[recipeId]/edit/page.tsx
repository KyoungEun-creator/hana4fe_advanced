'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { getRecipeFromLocalStorage } from '@/lib/localStorage';
import { type TRecipe } from '@/lib/types';

export default function EditRecipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const Router = useRouter();
  const id = parseInt(recipeId);
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);
  const [versions, setVersions] = useState<{ date: string; recipe: TRecipe }[]>(
    []
  );

  const tagRef = useRef<HTMLInputElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const stepRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const recipe = getRecipeFromLocalStorage(id);
    if (recipe) {
      setTitle(recipe.title);
      setTags(recipe.tags || []);
      setIngredients(recipe.ingredients || []);
      setSteps(recipe.steps || []);
      setVersions(recipe.versions || []);
    }
  }, [id]);

  const handleTagSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (tagRef.current?.value) {
      const newval = tagRef.current.value;
      const formattedTag = newval.startsWith('#') ? newval : `#${newval}`;
      setTags((prevTags) => [...prevTags, formattedTag]);
      tagRef.current.value = '';
    }
  };
  const handleRemoveTag = (index: number) => {
    setTags((prevTags) => prevTags.filter((_, i) => i !== index));
  };

  const handleIngredientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (ingredientRef.current?.value) {
      const newval = ingredientRef.current.value;
      setIngredients((prevIngredients) => [...prevIngredients, newval]);
      ingredientRef.current.value = '';
    }
  };
  const handleRemoveIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const handleStepSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (stepRef.current?.value) {
      const newval = stepRef.current.value;
      setSteps((prevSteps) => [...prevSteps, newval]);
      stepRef.current.value = '';
    }
  };
  const handleRemoveStep = (index: number) => {
    setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
  };

  const isSaveDisabled = !title;

  function saveRecipe() {
    const storedRecipes = localStorage.getItem('recipes');
    const recipes = storedRecipes ? JSON.parse(storedRecipes) : [];

    const currentDate = new Date().toISOString();

    const updatedRecipe = {
      id: +recipeId,
      title,
      tags,
      ingredients,
      steps,
      versions: [
        ...versions,
        { date: currentDate, recipe: { id, title, tags, ingredients, steps } },
      ],
    };

    const updatedRecipes = recipes.map((recipe: TRecipe) =>
      recipe.id === id ? updatedRecipe : recipe
    );

    localStorage.setItem('recipes', JSON.stringify(updatedRecipes));
    Router.push(`/recipes/${recipeId}`);
  }

  return (
    <div className='w-full'>
      <h1 className='text-3xl font-extrabold my-4'>레시피 수정</h1>

      <div className='space-y-5'>
        <div className='flex flex-col'>
          <label htmlFor='title' className='font-bold text-xl'>
            🤓 레시피 제목
          </label>
          <input
            name='title'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='필수값입니다.'
            className='border text-black p-2 rounded'
          />
        </div>

        <form onSubmit={handleTagSubmit} className='flex flex-col'>
          <label htmlFor='tag' className='font-bold text-xl'>
            #️⃣ 태그 목록
          </label>
          <div className='flex justify-between gap-3 mb-3'>
            <input
              ref={tagRef}
              type='text'
              placeholder='태그를 입력하세요.'
              className='w-[95%] border text-black p-2 rounded'
            />
            <button
              type='submit'
              className='btn-default bg-purple-300 hover:bg-purple-600 hover:text-white text-black'
            >
              추가
            </button>
          </div>

          <div className='flex'>
            {tags.map((tag, index) => (
              <div key={index} className='flex'>
                <div className='btn-small bg-gray-300 mr-2 text-gray-800'>
                  <span>{tag}</span>
                  <button
                    onClick={() => handleRemoveTag(index)}
                    className='text-red-500 ml-2'
                  >
                    X
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>

        <form onSubmit={handleIngredientSubmit} className='flex flex-col'>
          <label htmlFor='ingredient' className='font-bold text-xl'>
            🍴 재료 목록
          </label>
          <div className='flex justify-between gap-3 mb-3'>
            <input
              ref={ingredientRef}
              type='text'
              placeholder='재료를 입력하세요.'
              className='w-[95%] border text-black p-2 rounded'
            />
            <button
              type='submit'
              className='btn-default bg-purple-300 hover:bg-purple-600 hover:text-white text-black'
            >
              추가
            </button>
          </div>
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
        </form>

        <form onSubmit={handleStepSubmit} className='flex flex-col'>
          <label htmlFor='step' className='font-bold text-xl'>
            🥣 조리 과정
          </label>
          <div className='flex justify-between gap-3 mb-3'>
            <input
              ref={stepRef}
              type='text'
              placeholder='조리 과정을 입력하세요.'
              className='w-[95%] border text-black p-2 rounded'
            />
            <button
              type='submit'
              className='btn-default bg-purple-300 hover:bg-purple-600 hover:text-white text-black'
            >
              추가
            </button>
          </div>
          <ol className='list-decimal ml-5'>
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
        </form>

        <div className='flex space-x-4'>
          <button
            onClick={saveRecipe}
            className={`btn-default bg-blue-500  text-white ${isSaveDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isSaveDisabled}
          >
            저장
          </button>
          <Link href={`/recipes/${recipeId}`}>
            <button className='btn-default bg-red-500 text-white'>취소</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
