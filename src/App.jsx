import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import ProtectedRoute from "./Components/ProtectedRoute";
import { AuthContext } from "./context/AuthContext";

// Auth Pages
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// User Pages
import Home from "./pages/User/Home";
import Dashboard from "./pages/User/Dashboard";
import BooksList from "./pages/User/BooksList";
import BookDetails from "./pages/User/BookDetails";
import BorrowBook from "./pages/User/BorrowBook";
import MyBooks from "./pages/User/MyBooks";
import Payment from "./pages/User/Payment";

// Admin Pages
import AdminDashboard from "./pages/Admin/AdminDashboard";
import ManageBook from "./pages/Admin/ManageBook";
import ManageUsers from "./pages/Admin/ManageUsers";

const App = () => {
  const { user } = useContext(AuthContext);

  const noFooterRoutes = [
    "/dashboard",
    "/books",
    "/books/:id",
    "/borrow",
    "/my-books",
    "/payment",
    "/admin",
    "/admin/manage-books",
    "/admin/manage-users",
  ];

  const currentPath = window.location.pathname;

  return (
    <Router>
      <Navbar />

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* User */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute role="user">
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books"
          element={
            <ProtectedRoute role="user">
              <BooksList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/books/:id"
          element={
            <ProtectedRoute role="user">
              <BookDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/borrow"
          element={
            <ProtectedRoute role="user">
              <BorrowBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-books"
          element={
            <ProtectedRoute role="user">
              <MyBooks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment"
          element={
            <ProtectedRoute role="user">
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-books"
          element={
            <ProtectedRoute role="admin">
              <ManageBook />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/manage-users"
          element={
            <ProtectedRoute role="admin">
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Home />} />
      </Routes>

      {!noFooterRoutes.includes(currentPath) && <Footer />}
    </Router>
  );
};

export default App;
