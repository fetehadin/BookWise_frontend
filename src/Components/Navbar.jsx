import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Book, Archive, LogOut, User, LayoutDashboard, Users, RotateCw, Menu, X } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setIsOpen(false);
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`navbar ${user ? "protected-navbar" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          <BookOpen className="navbar-icon" size={32} />
          <span className="navbar-title">BookWise</span>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <div className="navbar-hamburger" onClick={toggleMenu}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </div>

        {/* Links */}
        <div className={`navbar-links ${isOpen ? "open" : ""}`}>
          {user ? (
            <>
              {user.role === "user" && (
                <>
                  <Link to="/dashboard" className="navbar-link" onClick={() => setIsOpen(false)}>
                    <LayoutDashboard size={18} />
                    <span>Dashboard</span>
                  </Link>
                  <Link to="/books" className="navbar-link" onClick={() => setIsOpen(false)}>
                    <BookOpen size={18} />
                    <span>Books</span>
                  </Link>
                  <Link to="/borrow" className="navbar-link" onClick={() => setIsOpen(false)}>
                    <RotateCw size={18} />
                    <span>Return Book</span>
                  </Link>
                  <Link to="/my-books" className="navbar-link" onClick={() => setIsOpen(false)}>
                    <Book size={18} />
                    <span>My Books</span>
                  </Link>
                </>
              )}

              {user.role === "admin" && (
                <>
                  <Link to="/admin" className="navbar-link" onClick={() => setIsOpen(false)}>
                    <LayoutDashboard size={18} />
                    <span>Admin Dashboard</span>
                  </Link>
                  <Link to="/manage-books" className="navbar-link" onClick={() => setIsOpen(false)}>
                    <BookOpen size={18} />
                    <span>Manage Books</span>
                  </Link>
                  <Link to="/manage-users" className="navbar-link" onClick={() => setIsOpen(false)}>
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
            </>
          ) : (
            <div className="navbar-right">
              <Link to="/login" className="btn-link" onClick={() => setIsOpen(false)}>Login</Link>
              <Link to="/register" className="btn-link btn-primary" onClick={() => setIsOpen(false)}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
