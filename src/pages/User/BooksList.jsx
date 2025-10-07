// src/pages/User/BookList.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // for navigation
import Loader from "../../Components/Loader";
import { toast } from "sonner";

// Sample books array
const sampleBooks = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", copies: 5, availableCopies: 3, price: 10 },
  { id: "2", title: "1984", author: "George Orwell", genre: "Dystopian", copies: 4, availableCopies: 0, price: 8 },
  { id: "3", title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", copies: 6, availableCopies: 6, price: 12 },
];

export default function BookList() {
  const [books, setBooks] = useState(sampleBooks);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (search) {
      const filtered = sampleBooks.filter(
        (book) =>
          book.title.toLowerCase().includes(search.toLowerCase()) ||
          book.author.toLowerCase().includes(search.toLowerCase())
      );
      setBooks(filtered);
    } else {
      setBooks(sampleBooks);
    }
  }, [search]);

  const handleBorrow = (bookId) => {
    const book = books.find((b) => b.id === bookId);
    if (book.availableCopies > 0) {
      navigate("/payment", { state: { book } });
    } else {
      toast.error("This book is not available.");
    }
  };

  return (
    <>
      <div className="book-list-container">
        <h1>Book Library</h1>

        <input
          type="text"
          placeholder="Search by title or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />

        {isLoading ? (
          <Loader />
        ) : books.length === 0 ? (
          <p className="no-books">No books found.</p>
        ) : (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card">
                <div className="book-info">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-genre">{book.genre}</p>
                  <p className={`book-availability ${book.availableCopies === 0 ? "unavailable" : ""}`}>
                    {book.availableCopies > 0
                      ? `${book.availableCopies} available`
                      : "Not available"}
                  </p>
                  <p className="book-price">Fee: ${book.price}</p>
                </div>
                <button
                  className={`borrow-btn ${book.availableCopies === 0 ? "disabled" : ""}`}
                  onClick={() => handleBorrow(book.id)}
                  disabled={book.availableCopies === 0}
                >
                  {book.availableCopies > 0 ? "Borrow" : "Unavailable"}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modern Professional Styling */}
      <style jsx>{`
        .book-list-container {
          max-width: 1200px;
          margin: 3rem auto;
          padding: 2.5rem 2rem;
          background: #f9fafb;
          border-radius: 1.25rem;
          font-family: "Inter", sans-serif;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          box-shadow: 0 8px 20px rgba(0,0,0,0.05);
        }

        .book-list-container h1 {
          font-size: 2.75rem;
          font-weight: 800;
          text-align: center;
          color: #111827;
          margin-bottom: 1rem;
        }

        .search-input {
          width: 100%;
          max-width: 450px;
          margin: 0 auto;
          padding: 0.75rem 1.25rem;
          font-size: 1.1rem;
          border: 2px solid #d1d5db;
          border-radius: 0.75rem;
          outline: none;
          transition: all 0.3s;
        }

        .search-input:focus {
          border-color: #3b82f6;
          box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 2rem;
        }

        .book-card {
          background: white;
          padding: 1.75rem 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .book-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 35px rgba(0,0,0,0.12);
        }

        .book-info {
          margin-bottom: 1rem;
        }

        .book-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
        }

        .book-author {
          font-size: 1.1rem;
          color: #4b5563;
          margin: 0.25rem 0;
        }

        .book-genre {
          font-size: 0.95rem;
          color: #6b7280;
          margin-bottom: 0.5rem;
        }

        .book-availability {
          font-weight: 600;
          color: #10b981;
        }

        .book-availability.unavailable {
          color: #ef4444; /* red */
        }

        .book-price {
          font-weight: 700;
          margin-top: 0.25rem;
          color: #3b82f6;
        }

        .borrow-btn {
          padding: 0.65rem 1.2rem;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          border: none;
          border-radius: 0.75rem;
          cursor: pointer;
          transition: all 0.3s;
          align-self: flex-start;
        }

        .borrow-btn:hover {
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          transform: translateY(-2px);
        }

        .borrow-btn.disabled,
        .borrow-btn:disabled {
          background: #9ca3af;
          cursor: not-allowed;
          transform: none;
        }

        .no-books {
          text-align: center;
          font-size: 1.2rem;
          color: #6b7280;
        }

        @media (max-width: 640px) {
          .book-list-container h1 {
            font-size: 2rem;
          }
        }
      `}</style>
    </>
  );
}
