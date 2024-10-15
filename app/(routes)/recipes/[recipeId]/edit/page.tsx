import { getRecipe, save } from '@/actions/recipes';
import { redirect } from 'next/navigation';

export default async function EditRecipe({
  params: { recipeId },
}: {
  params: { recipeId: string };
}) {
  const { title, ingredients, steps } = await getRecipe(+recipeId);

  async function saveRecipe(formData: FormData) {
    'use server';
    const title = formData.get('title');
    const ingredient = formData.get('ingredient');

    if (!title) return alert('레시피 제목란을 채워주세요!');

    save(+recipeId, String());

    redirect(`/books/${recipeId}`);
  }

  return (
    <div className='w-full'>
      <h1 className='text-3xl font-extrabold'>레시피 수정</h1>

      <form action={saveRecipe} className='space-y-5'>
        <div className='flex flex-col'>
          <label htmlFor='title'>레시피 제목</label>
          <input
            name='title'
            type='text'
            defaultValue={title}
            className='border text-black p-2 rounded'
          />
        </div>

        <div className='flex flex-col'>
          <label htmlFor='ingredient'>재료 목록</label>
          <div className='flex justify-between space-x-4'>
            <input
              name='ingredient'
              type='text'
              placeholder='재료를 입력하세요.'
              className='w-[94%] border text-black p-2 rounded'
            />
            <button className='bg-green-300 text-black px-3 py-2 rounded'>
              추가
            </button>
          </div>

          {/* 기존 재료 목록 */}
          {ingredients.map((ingredient) => (
            <div className='flex gap-3'>
              <li key={ingredient}>{ingredient}</li>
              <button className='text-red-500'>삭제</button>
            </div>
          ))}
        </div>

        <div className='flex flex-col'>
          <label htmlFor='step'>조리 과정</label>
          <div className='flex justify-between space-x-4'>
            <input
              name='step'
              type='text'
              placeholder='조리 과정을 입력하세요.'
              className='w-[94%] border text-black p-2 rounded'
            />
            <button className='bg-green-300 text-black px-3 py-2 rounded'>
              추가
            </button>
          </div>

          {/* 기존 조리 과정 */}
          <ol>
            {steps.map((step) => (
              <div className='flex gap-3'>
                <li key={step}>{step}</li>
                <button className='text-red-500'>삭제</button>
              </div>
            ))}
          </ol>
        </div>

        <div>
          <button type='submit' className='bg-blue-400 p-3 rounded'>
            레시피 수정
          </button>
        </div>
      </form>
    </div>
  );
}
