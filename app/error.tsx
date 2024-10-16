'use client';

import Image from 'next/image';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {}, [error]);

  return (
    <div>
      <h2>Something went wrong!</h2>
      <Image
        src='/images/error.jpeg'
        alt='Logo'
        width={1000}
        height={1000}
        className='my-3'
      />
      <div className='w-full overflow-scroll text-red-500'>
        {error.stack || error.message}
      </div>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
