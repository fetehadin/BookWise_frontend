// src/services/booksAPI.js
let books = [
  {
    id: "1",
    title: "The Power of Now",
    author: "Eckhart Tolle",  // updated
    genre: "Spiritual",
    copies: 5,
    availableCopies: 3,
    fee: 10,
  },
  {
    id: "2",
    title: "Atomic Habits",
    author: "James Clear",  // updated
    genre: "Self-help",
    copies: 4,
    availableCopies: 0,
    fee: 8,
  },
  {

  id: "3",
  title: "Ego Is the Enemy",
  author: "Ryan Holiday",
  genre: "Self-help",
  copies: 6,
  availableCopies: 6,
  fee: 12,


  },
];

export const getAllBooks = async () => {
  return Promise.resolve(books);
};

export const addBook = async (book) => {
  const newBook = {
    ...book,
    id: String(Date.now()),
    availableCopies: book.copies,
  };
  books.push(newBook);
  return Promise.resolve(newBook);
};

export const updateBook = async (id, updatedBook) => {
  books = books.map((b) =>
    b.id === id ? { ...b, ...updatedBook } : b
  );
  return Promise.resolve();
};

export const deleteBook = async (id) => {
  books = books.filter((b) => b.id !== id);
  return Promise.resolve();
};
