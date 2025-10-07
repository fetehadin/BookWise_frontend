// src/services/booksAPI.js
let books = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    copies: 5,
    availableCopies: 3,
    fee: 10,
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    copies: 4,
    availableCopies: 0,
    fee: 8,
  },
  {
    id: "3",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
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
