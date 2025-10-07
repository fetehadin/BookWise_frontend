// src/services/transactionsAPI.js
import axiosInstance from "./axiosInstance";

/**
 * Borrow a book
 * @param {string} bookId
 * @returns {Promise<Object>}
 */
export const borrowBook = async (bookId) => {
  try {
    const response = await axiosInstance.post(`/transactions/borrow/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error borrowing book:", error);
    throw error;
  }
};

/**
 * Return a book
 * @param {string} bookId
 * @returns {Promise<Object>}
 */
export const returnBook = async (bookId) => {
  try {
    const response = await axiosInstance.post(`/transactions/return/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error returning book:", error);
    throw error;
  }
};

/**
 * Get all books borrowed by the current user
 * @returns {Promise<Array>}
 */
export const getMyBooks = async () => {
  try {
    const response = await axiosInstance.get("/transactions/my-books");
    return response.data;
  } catch (error) {
    console.error("Error fetching my books:", error);
    throw error;
  }
};
