import { useState, useEffect } from "react";
import { toast } from "sonner";
import Loader from "../../Components/Loader";
import { FaEdit, FaTrash, FaUserPlus, FaTimes } from "react-icons/fa";

export default function ManageUsers() {
  // Sample users
  const sampleUsers = [
    { id: 1, username: "john_doe", email: "john@example.com", role: "user" },
    { id: 2, username: "admin01", email: "admin@example.com", role: "admin" },
    { id: 3, username: "jane_smith", email: "jane@example.com", role: "user" },
  ];

  const [users, setUsers] = useState(sampleUsers);
  const [search, setSearch] = useState("");
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "user" });
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email) {
      toast.error("Please fill all fields!");
      return;
    }

    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    setUsers([...users, { ...newUser, id }]);
    toast.success("User added!");
    setNewUser({ username: "", email: "", role: "user" });
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setNewUser({ username: user.username, email: user.email, role: user.role });
  };

  const handleUpdateUser = () => {
    setUsers(
      users.map((u) => (u.id === editingUser.id ? { ...u, ...newUser } : u))
    );
    toast.success("User updated!");
    setEditingUser(null);
    setNewUser({ username: "", email: "", role: "user" });
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("User deleted!");
  };

  if (isLoading) return <Loader />;

  return (
    <div className="manage-users-container">
      <h1>👥 Manage Users</h1>
      <p className="subtitle">Add, edit, or remove users from the platform.</p>

      {/* Search */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by username or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Add/Edit User Form */}
      <div className="user-form">
        <h3>
          {editingUser ? "✏️ Edit User" : <><FaUserPlus /> Add New User</>}
        </h3>
        <div className="form-grid">
          <input
            type="text"
            placeholder="Username"
            value={newUser.username}
            onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          />
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div className="form-buttons">
          {editingUser ? (
            <button className="update" onClick={handleUpdateUser}>
              Update <FaEdit />
            </button>
          ) : (
            <button className="add" onClick={handleAddUser}>
              Add <FaUserPlus />
            </button>
          )}
          {editingUser && (
            <button
              className="cancel"
              onClick={() => {
                setEditingUser(null);
                setNewUser({ username: "", email: "", role: "user" });
              }}
            >
              Cancel <FaTimes />
            </button>
          )}
        </div>
      </div>

      {/* Users Table */}
      <table className="users-table">
        <thead>
          <tr>
            <th>👤 Username</th>
            <th>📧 Email</th>
            <th>🔑 Role</th>
            <th>⚙️ Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button className="edit" onClick={() => handleEditUser(user)}>
                    <FaEdit />
                  </button>
                  <button className="delete" onClick={() => handleDeleteUser(user.id)}>
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Styles */}
      <style jsx>{`
        .manage-users-container {
          max-width: 1100px;
          margin: 3rem auto;
          padding: 2rem;
          font-family: "Inter", sans-serif;
        }

        h1 {
          text-align: center;
          font-size: 2.2rem;
          margin-bottom: 0.5rem;
          color: #1e40af;
        }

        .subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .search-bar input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
          margin-bottom: 1.5rem;
          font-size: 1rem;
        }

        .user-form {
          background: #f9fafb;
          padding: 1.5rem;
          border-radius: 1rem;
          margin-bottom: 2rem;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }

        .form-buttons {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1.25rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          color: white;
          transition: all 0.2s ease;
        }

        .add {
          background: #3b82f6;
        }
        .add:hover {
          background: #2563eb;
          transform: scale(1.05);
        }

        .update {
          background: #10b981;
        }
        .update:hover {
          background: #059669;
          transform: scale(1.05);
        }

        .cancel {
          background: #6b7280;
        }
        .cancel:hover {
          transform: scale(1.05);
        }

        .users-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 1rem;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
          border-radius: 0.5rem;
          overflow: hidden;
        }

        th, td {
          padding: 0.75rem;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        th {
          background: #1e40af;
          color: white;
          font-weight: 600;
        }

        tr:nth-child(even) {
          background: #f3f4f6;
        }

        .edit {
          background: #10b981;
          padding: 0.4rem 0.8rem;
          margin-right: 0.3rem;
        }
        .edit:hover {
          background: #059669;
          transform: scale(1.1);
        }

        .delete {
          background: #ef4444;
          padding: 0.4rem 0.8rem;
        }
        .delete:hover {
          background: #b91c1c;
          transform: scale(1.1);
        }

        select, input {
          font-size: 1rem;
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
        }
      `}</style>
    </div>
  );
}
