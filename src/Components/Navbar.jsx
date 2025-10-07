import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, LogOut, User, LayoutDashboard, Users } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className={`navbar ${user ? "protected-navbar" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <BookOpen className="navbar-icon" size={32} />
          <span className="navbar-title">BookWise</span>
        </Link>

        {/* Nav Links / User Info */}
        {user && (
          <div className="navbar-links">
            {user.role === "user" && (
              <>
                <Link to="/dashboard" className="navbar-link">
                  <LayoutDashboard size={18} />
                  <span>Dashboard</span>
                </Link>
                <Link to="/books" className="navbar-link">
                  <BookOpen size={18} />
                  <span>Books</span>
                </Link>
                <Link to="/borrow" className="navbar-link">
                  <BookOpen size={18} />
                  <span>Borrow Book</span>
                </Link>
                <Link to="/my-books" className="navbar-link">
                  <BookOpen size={18} />
                  <span>My Books</span>
                </Link>
              </>
            )}

            {user.role === "admin" && (
              <>
                <Link to="/admin" className="navbar-link">
                  <LayoutDashboard size={18} />
                  <span>Admin Dashboard</span>
                </Link>
                <Link to="/manage-books" className="navbar-link">
                  <BookOpen size={18} />
                  <span>Manage Books</span>
                </Link>
                <Link to="/manage-users" className="navbar-link">
                  <Users size={18} />
                  <span>Manage Users</span>
                </Link>
              </>
            )}

            <div className="navbar-user">
              <User size={20} />
              <span>{user.username}</span>
              <span className="user-role">{user.role}</span>
            </div>

            <button className="btn-logout" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        )}

        {/* Public links when not logged in */}
        {!user && (
          <div className="navbar-right">
            <Link to="/login" className="btn-link">Login</Link>
            <Link to="/register" className="btn-link btn-primary">Register</Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
