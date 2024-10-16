'use client';

import { useSession } from 'next-auth/react';

export default function SignInOut() {
  const { data: session } = useSession();

  if (session?.user)
    return (
      <a
        href='/api/auth/signout?callbackUrl=/'
        className='btn-default text-center bg-red-500'
      >
        로그아웃
      </a>
    );
  return (
    <a
      href='/api/auth/signin?callbackUrl=/'
      className='btn-default text-center bg-red-500'
    >
      로그인
    </a>
  );
}
