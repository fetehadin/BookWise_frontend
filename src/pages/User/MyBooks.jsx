// src/pages/User/MyBooks.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import * as booksAPI from "../../services/booksAPI";
import Loader from "../../Components/Loader";
import { toast } from "sonner";
import { Calendar, BookOpen } from "lucide-react";

export default function MyBooks() {
  const { user } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMyBooks();
  }, []);

  const loadMyBooks = async () => {
    setIsLoading(true);
    try {
      const data = await booksAPI.getBorrowedBooks(); // fetch all borrowed books
      setMyBooks(data);
    } catch (error) {
      toast.error("Failed to load your books");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      await booksAPI.returnBook(borrowId);
      toast.success("Book returned successfully!");
      loadMyBooks();
    } catch (error) {
      toast.error("Failed to return book");
    }
  };

  const styles = {
    container: {
      padding: "2rem",
      minHeight: "calc(100vh - 120px)",
      backgroundColor: "#f8f9fa",
      fontFamily: "sans-serif",
      color: "#333",
    },
    header: {
      fontSize: "2.2rem",
      fontWeight: "bold",
      marginBottom: "0.5rem",
    },
    subtitle: {
      color: "#555",
      fontSize: "1rem",
      marginBottom: "2rem",
    },
    noBooks: {
      textAlign: "center",
      marginTop: "3rem",
      color: "#777",
      fontSize: "1.1rem",
    },
    browseButton: {
      padding: "0.5rem 1rem",
      backgroundColor: "#0d6efd",
      color: "#fff",
      borderRadius: "6px",
      textDecoration: "none",
      display: "inline-block",
      marginTop: "1rem",
    },
    grid: {
      display: "grid",
      gap: "1rem",
    },
    card: {
      padding: "1rem",
      borderRadius: "8px",
      backgroundColor: "#fff",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
    },
    title: {
      fontWeight: "600",
      marginBottom: "0.3rem",
    },
    author: {
      color: "#555",
      fontSize: "0.9rem",
    },
    borrowInfo: {
      display: "flex",
      gap: "1rem",
      marginTop: "0.5rem",
      fontSize: "0.85rem",
      alignItems: "center",
    },
    dueDate: {
      display: "flex",
      alignItems: "center",
      gap: "0.3rem",
    },
    badge: {
      padding: "0.2rem 0.5rem",
      borderRadius: "6px",
      fontSize: "0.75rem",
      fontWeight: "500",
    },
    borrowed: { backgroundColor: "#0d6efd20", color: "#0d6efd" },
    returned: { backgroundColor: "#19875420", color: "#198754" },
    overdue: { backgroundColor: "#dc354520", color: "#dc3545" },
    returnButton: {
      padding: "0.4rem 0.8rem",
      border: "1px solid #0d6efd",
      borderRadius: "6px",
      backgroundColor: "#fff",
      color: "#0d6efd",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>{user?.username}'s Books</h1>
      <p style={styles.subtitle}>View all your borrowed and returned books</p>

      {isLoading ? (
        <Loader />
      ) : myBooks.length === 0 ? (
        <div style={styles.noBooks}>
          <BookOpen size={64} />
          <p>You haven't borrowed any books yet</p>
          <a href="/books" style={styles.browseButton}>
            Browse Books
          </a>
        </div>
      ) : (
        <div style={styles.grid}>
          {myBooks.map((borrow) => (
            <div key={borrow.id} style={styles.card}>
              <div>
                <h3 style={styles.title}>{borrow.book.title}</h3>
                <p style={styles.author}>{borrow.book.author}</p>
                <div style={styles.borrowInfo}>
                  <span style={styles.dueDate}>
                    <Calendar size={14} /> Due:{" "}
                    {new Date(borrow.dueDate).toLocaleDateString()}
                  </span>
                  <span
                    style={{
                      ...styles.badge,
                      ...(borrow.status === "borrowed"
                        ? styles.borrowed
                        : borrow.status === "overdue"
                        ? styles.overdue
                        : styles.returned),
                    }}
                  >
                    {borrow.status}
                  </span>
                </div>
              </div>
              {borrow.status === "borrowed" && (
                <button
                  style={styles.returnButton}
                  onClick={() => handleReturn(borrow.id)}
                >
                  Return
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
