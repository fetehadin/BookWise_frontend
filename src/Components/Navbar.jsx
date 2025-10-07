// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, User, Users, LayoutDashboard } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css"; // Make sure this path exists
import "../pages/User/Home"

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isAuthenticated = !!user;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-left">
          <Link to="/" className="navbar-brand">
            <BookOpen className="navbar-icon" size={32} />
            <span className="navbar-title">BookWise</span>
          </Link>

          {isAuthenticated && (
            <div className="navbar-links">
              <Link to="/dashboard" className="navbar-link">
                <LayoutDashboard size={18} />
                <span>Dashboard</span>
              </Link>
              <Link to="/books" className="navbar-link">
                <BookOpen size={18} />
                <span>Books</span>
              </Link>
              {user.role === "admin" && (
                <Link to="/admin" className="navbar-link">
                  <LayoutDashboard size={18} />
                  <span>Admin</span>
                </Link>
              )}
              {user.role === "superuser" && (
                <Link to="/users" className="navbar-link">
                  <Users size={18} />
                  <span>Users</span>
                </Link>
              )}
            </div>
          )}
        </div>

        <div className="navbar-right">
          {isAuthenticated ? (
            <>
              <div className="navbar-user">
                <User size={20} className="user-icon" />
                <span className="user-name">{user.username}</span>
                <span className="user-role">{user.role}</span>
              </div>
              <button className="btn-logout" onClick={handleLogout}>
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-link">
                Login
              </Link>
              <Link to="/register" className="btn-link btn-primary">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
