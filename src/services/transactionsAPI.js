// src/services/transactionsAPI.js
import axiosInstance from "./axiosInstance";

// Borrow a book
export const borrowBook = async (bookId) => {
  const response = await axiosInstance.post(`/transactions/borrow/${bookId}`);
  return response.data;
};

// Return a book
export const returnBook = async (bookId) => {
  const response = await axiosInstance.post(`/transactions/return/${bookId}`);
  return response.data;
};

// Get books borrowed by the current user
export const getMyBooks = async () => {
  const response = await axiosInstance.get("/transactions/my-books");
  return response.data;
};
