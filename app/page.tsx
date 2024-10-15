import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Link
        href={'/recipes'}
        className='text-2xl underline hover:text-pink-500 mb-3'
      >
        레시피 리스트 바로가기
      </Link>
      <Image src='/images/home.jpg' alt='Logo' width={800} height={800} />
      <div className='text-2xl bg-pink-500 mt-3'>
        💝🧚🏻‍♂️당신만의 레시피를 저장해보세요!!🫶💘
      </div>
    </>
  );
}
