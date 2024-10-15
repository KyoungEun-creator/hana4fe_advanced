'use client';

import { delRecipe } from '@/actions/recipes';

type TProps = {
  id: number;
};

export default function DelRecipe({ id }: TProps) {
  return (
    <button
      onClick={async () => {
        if (confirm('Are you sure?')) delRecipe(id);
      }}
      className='text-black bg-pink-500 rounded p-3'
    >
      삭제
    </button>
  );
}
