// src/pages/User/Home.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, Users, Shield, TrendingUp } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/Home.css";

export const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const isAuthenticated = !!user;

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="home-hero">
        <BookOpen className="home-hero-icon" size={80} />
        <h1 className="home-hero-title">Welcome to BookWise</h1>
        <p className="home-hero-desc">
          Your comprehensive library management solution. Browse, borrow, and manage books with ease.
        </p>
        <div className="home-hero-buttons">
          {isAuthenticated ? (
            <>
              <button
                className="home-hero-button primary"
                onClick={() => navigate("/dashboard")}
              >
                Go to Dashboard
              </button>
              <button
                className="home-hero-button secondary"
                onClick={() => navigate("/books")}
              >
                Browse Books
              </button>
            </>
          ) : (
            <>
              <button
                className="home-hero-button primary"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
              <button
                className="home-hero-button secondary"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="home-features">
        <div className="home-feature-card">
          <BookOpen className="home-feature-icon" size={48} />
          <h3 className="home-feature-title">Extensive Collection</h3>
          <p className="home-feature-desc">
            Access a wide range of books across various genres and categories.
          </p>
        </div>

        <div className="home-feature-card">
          <Users className="home-feature-icon" size={48} />
          <h3 className="home-feature-title">Easy Management</h3>
          <p className="home-feature-desc">
            Simple and intuitive interface for borrowing and returning books.
          </p>
        </div>

        <div className="home-feature-card">
          <Shield className="home-feature-icon" size={48} />
          <h3 className="home-feature-title">Secure Access</h3>
          <p className="home-feature-desc">
            Role-based authentication ensures secure and appropriate access.
          </p>
        </div>

        <div className="home-feature-card">
          <TrendingUp className="home-feature-icon" size={48} />
          <h3 className="home-feature-title">Track Progress</h3>
          <p className="home-feature-desc">
            Monitor your borrowing history and manage due dates efficiently.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-cta">
        <h2 className="home-cta-title">Ready to start your reading journey?</h2>
        <p className="home-cta-desc">
          Join BookWise today and discover your next favorite book.
        </p>
        {!isAuthenticated && (
          <button
            className="home-cta-button"
            onClick={() => navigate("/register")}
          >
            Create Free Account
          </button>
        )}
      </section>
    </div>
  );
};
 export default Home;