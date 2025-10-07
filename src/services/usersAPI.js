// src/services/usersAPI.js
import axiosInstance from "./axiosInstance"; // make sure you have axiosInstance configured

// Fetch all users
export const getAllUsers = async () => {
  const response = await axiosInstance.get("/users"); // GET /users
  return response.data;
};

// Delete a user by ID
export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/users/${userId}`); // DELETE /users/:id
  return response.data;
};

// Optional: Add more functions as needed
// e.g., updateUser, createUser
export const updateUser = async (userId, updatedData) => {
  const response = await axiosInstance.put(`/users/${userId}`, updatedData); // PUT /users/:id
  return response.data;
};

export const createUser = async (userData) => {
  const response = await axiosInstance.post("/users", userData); // POST /users
  return response.data;
};
