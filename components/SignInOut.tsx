'use client';

import { useSession } from 'next-auth/react';

export default function SignInOut() {
  const { data: session } = useSession();

  if (session?.user)
    return (
      <a
        href='/api/auth/signout?callbackUrl=/'
        className='flex text-center bg-red-500 px-3 py-2 rounded'
      >
        로그아웃
      </a>
    );
  return (
    <a
      href='/api/auth/signin?callbackUrl=/'
      className='flex text-center bg-red-500 px-3 py-2 rounded'
    >
      로그인
    </a>
  );
}
