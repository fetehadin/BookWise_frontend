// src/pages/Admin/ManageUsers.jsx
import { useState, useEffect } from "react";
import * as usersAPI from "../../services/usersAPI";
import { toast } from "sonner";
import Loader from "../../Components/Loader";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    try {
      const data = await usersAPI.getAllUsers(); // fetch all users
      setUsers(data);
    } catch (error) {
      toast.error("Failed to load users.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await usersAPI.deleteUser(userId);
      toast.success("User deleted successfully.");
      loadUsers();
    } catch (error) {
      toast.error("Failed to delete user.");
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="manage-container">
      <h1>Manage Users</h1>

      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      {isLoading ? (
        <Loader />
      ) : filteredUsers.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style jsx>{`
        .manage-container {
          max-width: 1200px;
          margin: 3rem auto;
          padding: 2rem;
          background: #f9fafb;
          border-radius: 1rem;
          font-family: "Inter", sans-serif;
        }

        h1 {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-align: center;
        }

        .search-input {
          width: 100%;
          max-width: 400px;
          margin: 0 auto 1.5rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
        }

        .users-table th,
        .users-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
        }

        .delete-btn {
          padding: 0.4rem 0.8rem;
          border-radius: 0.5rem;
          border: none;
          background-color: #ef4444;
          color: white;
          cursor: pointer;
          font-weight: 600;
        }

        .delete-btn:hover {
          background-color: #dc2626;
        }
      `}</style>
    </div>
  );
}
