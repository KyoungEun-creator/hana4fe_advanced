'use client';

import { save } from '@/actions/recipes';
import { redirect } from 'next/navigation';
import { useRef, useState } from 'react';

export default function New() {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [steps, setSteps] = useState<string[]>([]);

  const tagRef = useRef<HTMLInputElement>(null);
  const ingredientRef = useRef<HTMLInputElement>(null);
  const stepRef = useRef<HTMLInputElement>(null);

  const handleAddTag = () => {
    if (tagRef.current) {
      const newTag = tagRef.current.value.trim();
      if (newTag) {
        setTags([...tags, newTag]);
        tagRef.current.value = '';
      }
    }
  };

  const handleAddIngredient = () => {
    if (ingredientRef.current) {
      const newIngredient = ingredientRef.current.value.trim();
      if (newIngredient) {
        setIngredients([...ingredients, newIngredient]);
        ingredientRef.current.value = '';
      }
    }
  };

  const handleAddStep = () => {
    if (stepRef.current) {
      const newStep = stepRef.current.value.trim();
      if (newStep) {
        setSteps([...steps, newStep]);
        stepRef.current.value = '';
      }
    }
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('레시피 제목란을 채워주세요!');
      return;
    }
    // 저장 로직 추가 (예: save() 함수 호출)
    redirect(`/recipes`);
  };

  return (
    <div className='w-full'>
      <h1 className='text-3xl font-extrabold my-4'>새 레시피 추가하기</h1>

      <form className='space-y-5' onSubmit={handleSubmit}>
        <div className='flex flex-col'>
          <label htmlFor='title' className='font-bold text-xl'>
            레시피 제목
          </label>
          <input
            name='title'
            type='text'
            placeholder='레시피 제목을 입력하세요.'
            className='border text-black p-2 rounded'
          />
        </div>

        {/* 태그 */}
        <div className='flex flex-col space-y-3'>
          <label htmlFor='tag' className='font-bold text-xl'>
            태그
          </label>
          <div className='flex justify-between space-x-4'>
            <input
              name='tag'
              ref={tagRef}
              type='text'
              placeholder='태그를 입력하세요.'
              className='w-[94%] border text-black p-2 rounded'
            />
            <button
              type='button'
              onClick={handleAddTag}
              className='bg-purple-300 text-black px-3 py-2 rounded'
            >
              추가
            </button>
          </div>
          <ul className='flex'>
            {tags.map((tag, index) => (
              <li
                key={index}
                className='bg-gray-300 px-2 py-1 mr-2 text-gray-800 rounded'
              >
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        {/* 재료 목록 */}
        <div className='flex flex-col'>
          <label htmlFor='ingredient' className='font-bold text-xl'>
            재료 목록
          </label>
          <div className='flex justify-between space-x-4'>
            <input
              name='ingredient'
              ref={ingredientRef}
              type='text'
              placeholder='재료를 입력하세요.'
              className='w-[94%] border text-black p-2 rounded'
            />
            <button
              type='button'
              onClick={handleAddIngredient}
              className='bg-green-300 text-black px-3 py-2 rounded'
            >
              추가
            </button>
          </div>
          <div className='ml-5'>
            {ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </div>
        </div>

        {/* 조리 과정 */}
        <div className='flex flex-col'>
          <label htmlFor='step' className='font-bold text-xl'>
            조리 과정
          </label>
          <div className='flex justify-between space-x-4'>
            <input
              name='step'
              ref={stepRef}
              type='text'
              placeholder='조리 과정을 입력하세요.'
              className='w-[94%] border text-black p-2 rounded'
            />
            <button
              type='button'
              onClick={handleAddStep}
              className='bg-green-300 text-black px-3 py-2 rounded'
            >
              추가
            </button>
          </div>
          <ol className='list-decimal ml-5'>
            {steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </div>

        <div>
          <button type='submit' className='bg-blue-400 p-3 rounded'>
            레시피 저장
          </button>
        </div>
      </form>
    </div>
  );
}
