import { SessionProvider } from 'next-auth/react';
import { auth } from '@/lib/auth';
import SignInOut from './SignInOut';

export default async function Nav() {
  const session = await auth();
  return (
    <nav className='flex justify-between items-center bg-green-600 shadow-md mb-3 px-5 py-2'>
      <div className='font-extrabold text-2xl'>
        <a href='/'>🧑🏻‍🍳 나만의 레시피</a>
      </div>
      <div className='flex w-52 justify-between'>
        <a
          href='/new'
          className='flex text-center bg-blue-500 px-3 py-2 rounded'
        >
          레시피 추가
        </a>
        <SessionProvider session={session}>
          <SignInOut />
        </SessionProvider>
      </div>
    </nav>
  );
}
