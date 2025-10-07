import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "../../Components/Loader";
import * as transactionsAPI from "../../services/transactionsAPI";

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const { book } = location.state || {};

  const [isLoading, setIsLoading] = useState(false);

  if (!book) {
    // If no book was passed, redirect to books list
    navigate("/books");
    return null;
  }

  const handlePaymentAndBorrow = async () => {
    setIsLoading(true);
    try {
      // Simulate payment success (replace this with real payment integration later)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Call borrow API
      await transactionsAPI.borrowBook(book.id);

      toast.success(`You have successfully borrowed "${book.title}"!`);
      navigate("/my-books");
    } catch (error) {
      toast.error("Failed to borrow the book. Please try again.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <h1>Confirm Borrowing</h1>
          <div className="book-summary">
            <h2>{book.title}</h2>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Fee: ${book.price}</p>
          </div>
          <button className="pay-btn" onClick={handlePaymentAndBorrow}>
            Pay & Borrow
          </button>
        </>
      )}

      <style jsx>{`
        .payment-container {
          max-width: 600px;
          margin: 4rem auto;
          padding: 2rem;
          background: linear-gradient(145deg, #f3f4f6, #e5e7eb);
          border-radius: 1rem;
          font-family: "Inter", sans-serif;
          display: flex;
          flex-direction: column;
          gap: 2rem;
          text-align: center;
        }

        h1 {
          font-size: 2.5rem;
          color: #1f2937;
          font-weight: 800;
        }

        .book-summary {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.08);
        }

        .book-summary h2 {
          font-size: 1.75rem;
          color: #111827;
          margin-bottom: 0.5rem;
        }

        .book-summary p {
          font-size: 1rem;
          color: #4b5563;
          margin: 0.25rem 0;
        }

        .pay-btn {
          margin-top: 1.5rem;
          padding: 0.75rem 1.5rem;
          font-size: 1.1rem;
          font-weight: 700;
          color: white;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          border: none;
          border-radius: 0.5rem;
          cursor: pointer;
          transition: all 0.3s;
        }

        .pay-btn:hover {
          background: linear-gradient(90deg, #2563eb, #3b82f6);
          transform: translateY(-2px);
        }

        @media (max-width: 640px) {
          .payment-container {
            margin: 2rem auto;
            padding: 1.5rem;
          }

          h1 {
            font-size: 2rem;
          }

          .book-summary h2 {
            font-size: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
}
