// src/pages/User/Dashboard.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as booksAPI from "../../services/booksAPI";
import BookCard from "../../Components/BookCard";
import Loader from "../../Components/Loader";
import { toast } from "sonner";
import { BookOpen, Calendar, CheckCircle, AlertCircle } from "lucide-react";
import "../../styles/Dashboard.css";

export default function Dashboard() {
  const { user } = useContext(AuthContext);
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadBorrowedBooks();
  }, []);

  const loadBorrowedBooks = async () => {
    setIsLoading(true);
    try {
      const data = await booksAPI.getBorrowedBooks();
      setBorrowedBooks(data);
    } catch (error) {
      toast.error("Failed to load borrowed books");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      await booksAPI.returnBook(borrowId);
      toast.success("Book returned successfully!");
      loadBorrowedBooks();
    } catch (error) {
      toast.error("Failed to return book");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.username}!</h1>
        <p>Manage your borrowed books and explore the library</p>
      </div>

      <div className="status-cards">
        <div className="status-card">
          <div className="card-header">
            <div className="icon borrowed">
              <BookOpen size={20} />
            </div>
            <div>
              <div className="card-title">0</div>
              <div className="card-desc">Currently Borrowed</div>
            </div>
          </div>
        </div>

        <div className="status-card">
          <div className="card-header">
            <div className="icon returned">
              <CheckCircle size={20} />
            </div>
            <div>
              <div className="card-title">1</div>
              <div className="card-desc">Books Returned</div>
            </div>
          </div>
        </div>

        <div className="status-card">
          <div className="card-header">
            <div className="icon overdue">
              <AlertCircle size={20} />
            </div>
            <div>
              <div className="card-title">1</div>
              <div className="card-desc">Overdue Books</div>
            </div>
          </div>
        </div>
      </div>

      <div className="borrowed-books-section">
        <h2>Your Borrowed Books</h2>
        <p>Track and manage your current borrowings</p>

        {isLoading ? (
          <Loader />
        ) : borrowedBooks.length === 0 ? (
          <div className="no-books">
            <BookOpen size={64} />
            <p>You haven't borrowed any books yet</p>
            <a href="/books" className="browse-button">
              Browse Books
            </a>
          </div>
        ) : (
          <div className="borrowed-books-grid">
            {borrowedBooks.map((borrow) => (
              <div key={borrow.id} className="borrowed-book-card">
                <div>
                  <h3>{borrow.book.title}</h3>
                  <p>{borrow.book.author}</p>
                  <div className="borrow-info">
                    <span className="due-date">
                      <Calendar size={14} /> Due: {new Date(borrow.dueDate).toLocaleDateString()}
                    </span>
                    <span className={`status-badge ${borrow.status}`}>{borrow.status}</span>
                  </div>
                </div>
                {borrow.status === "borrowed" && (
                  <button onClick={() => handleReturn(borrow.id)}>Return</button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
