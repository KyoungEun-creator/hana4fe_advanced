// // 하나의 book 정보
// import { getBook, save } from '@/actions/books';
// import NotFoundBook from '@/app/books/not-found';
// import { books, TBook } from '../bookdata';

// type TParams = {
//   params: {
//     bookId: string;
//   };
// };

// export function GET(req: Request, { params: { bookId } }: TParams) {
//   const book = getBook(+bookId);
//   if (!book) return NotFoundBook;

//   return Response.json(book);
// }

// export async function PATCH(req: Request, { params: { bookId } }: TParams) {
//   const { title, writer } = (await req.json()) as TBook;
//   const book = save(+bookId, title, writer);
//   //   const book = books.find((book) => book.id === +bookId);
//   //   if (!book) return Response.json({ code: 404, message: 'Not Found' });

//   //   book.title = title;
//   //   book.writer = writer;

//   return Response.json(book);
// }

// export function DELETE(req: Request, { params: { bookId } }: TParams) {
//   const idx = books.findIndex((book) => book.id === +bookId);
//   if (idx === -1) return Response.json({ code: 404, message: 'Not Found' });

//   books.splice(idx, 1);
//   return Response.json({ code: 200, message: 'ok' });
// }
