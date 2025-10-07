// src/services/booksAPI.js
import axiosInstance from "./axiosInstance";

// Get all books
export const getAllBooks = async () => {
  const response = await axiosInstance.get("/books");
  return response.data;
};

// Get single book by id
export const getBookById = async (bookId) => {
  const response = await axiosInstance.get(`/books/${bookId}`);
  return response.data;
};

// Add a new book (admin)
export const addBook = async (bookData) => {
  const response = await axiosInstance.post("/books", bookData);
  return response.data;
};

// Edit an existing book (admin)
export const editBook = async (bookId, bookData) => {
  const response = await axiosInstance.put(`/books/${bookId}`, bookData);
  return response.data;
};

// Delete a book (admin)
export const deleteBook = async (bookId) => {
  const response = await axiosInstance.delete(`/books/${bookId}`);
  return response.data;
};
