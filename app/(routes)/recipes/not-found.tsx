import Image from 'next/image';

export default function NotFoundRecipe() {
  return (
    <>
      <div className='text-2xl mb-4'>This recipe is not found!</div>
      <Image
        src='/images/error.jpeg'
        alt='not-found'
        width={1000}
        height={1000}
      />
    </>
  );
}
