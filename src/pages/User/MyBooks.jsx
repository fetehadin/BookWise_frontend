// src/pages/User/MyBooks.jsx
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Loader from "../../Components/Loader";
import { toast } from "sonner";
import { FaCalendar, FaBookOpen, FaRedo } from "react-icons/fa";

// Demo borrowed books
const demoBooks = [
  {
    id: "1",
    book: { title: "1984", author: "George Orwell" },
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    status: "borrowed",
  },
  {
    id: "2",
    book: { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    dueDate: new Date(new Date().setDate(new Date().getDate() - 2)),
    status: "overdue",
  },
  {
    id: "3",
    book: { title: "To Kill a Mockingbird", author: "Harper Lee" },
    dueDate: new Date(),
    status: "returned",
  },
];

export default function MyBooks() {
  const { user } = useContext(AuthContext) || { user: { username: "DemoUser" } };
  const [myBooks, setMyBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadMyBooks();
  }, []);

  const loadMyBooks = async () => {
    setIsLoading(true);
    try {
      const data = demoBooks; // demo data
      setMyBooks(data);
    } catch (error) {
      toast.error("Failed to load your books");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReturn = async (borrowId) => {
    try {
      toast.success("Book returned successfully!");
      setMyBooks((prev) =>
        prev.map((b) =>
          b.id === borrowId ? { ...b, status: "returned" } : b
        )
      );
    } catch (error) {
      toast.error("Failed to return book");
    }
  };

  return (
    <div className="books-container">
      <h1>{user.username}'s Books</h1>
      <p className="subtitle">View all your borrowed and returned books</p>

      {isLoading ? (
        <Loader />
      ) : myBooks.length === 0 ? (
        <div className="no-books">
          <FaBookOpen size={64} />
          <p>You haven't borrowed any books yet</p>
          <a href="/books" className="browse-btn">Browse Books</a>
        </div>
      ) : (
        <div className="books-grid">
          {myBooks.map((borrow) => (
            <div key={borrow.id} className="book-card">
              <div>
                <h3>{borrow.book.title}</h3>
                <p className="author">{borrow.book.author}</p>
                <div className="borrow-info">
                  <span className="due-date">
                    <FaCalendar /> {new Date(borrow.dueDate).toLocaleDateString()}
                  </span>
                  <span className={`status ${borrow.status}`}>{borrow.status}</span>
                </div>
              </div>
              {borrow.status === "borrowed" && (
                <button className="return-btn" onClick={() => handleReturn(borrow.id)}>
                  <FaRedo /> Return
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .books-container {
          max-width: 1100px;
          margin: 2rem auto;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
          color: #1f2937;
        }

        h1 {
          font-size: 2.2rem;
          font-weight: 700;
          text-align: center;
          margin-bottom: 0.5rem;
        }

        .subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 2rem;
          font-size: 1rem;
        }

        .no-books {
          text-align: center;
          margin-top: 3rem;
          color: #6b7280;
        }

        .browse-btn {
          display: inline-block;
          margin-top: 1rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          background-color: #3b82f6;
          color: #fff;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.3s;
        }
        .browse-btn:hover {
          background-color: #2563eb;
        }

        .books-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .book-card {
          background: #fff;
          padding: 1.5rem;
          border-radius: 1rem;
          box-shadow: 0 3px 10px rgba(0,0,0,0.05);
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .book-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.1);
        }

        .author {
          color: #6b7280;
          font-size: 0.9rem;
          margin-bottom: 0.5rem;
        }

        .borrow-info {
          display: flex;
          gap: 1rem;
          font-size: 0.85rem;
          align-items: center;
          margin-top: 0.5rem;
        }

        .due-date {
          display: flex;
          align-items: center;
          gap: 0.3rem;
          font-weight: 500;
          color: #3b82f6;
        }

        .status.borrowed {
          background: #eff6ff;
          color: #3b82f6;
          padding: 0.2rem 0.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-transform: capitalize;
        }
        .status.overdue {
          background: #fee2e2;
          color: #dc2626;
          padding: 0.2rem 0.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-transform: capitalize;
        }
        .status.returned {
          background: #d1fae5;
          color: #10b981;
          padding: 0.2rem 0.5rem;
          border-radius: 0.5rem;
          font-weight: 600;
          text-transform: capitalize;
        }

        .return-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          font-weight: 600;
          color: #3b82f6;
          background: #fff;
          border: 1px solid #3b82f6;
          cursor: pointer;
          transition: all 0.3s;
        }
        .return-btn:hover {
          background-color: #3b82f6;
          color: #fff;
        }

        .return-btn svg {
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}
