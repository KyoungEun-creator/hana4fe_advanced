import Image from 'next/image';

export default function NotFound() {
  return (
    <>
      <div className='text-2xl mb-4'>이 페이지는 존재하지 않습니다🥹🙏</div>
      <Image
        src='/images/error.jpeg'
        alt='not-found'
        width={1000}
        height={1000}
      />
    </>
  );
}
