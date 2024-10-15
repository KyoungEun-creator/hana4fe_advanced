import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div>당신만의 레시피를 저장해보세요!!</div>
      <Link href={'/recipes'}>레시피 리스트 바로가기</Link>
    </>
  );
}
