import React from "react";

export default function BookCard({ book, onBorrow }) {
  return (
    <div className="book-card">
      <h3>{book.title}</h3>
      <p>{book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>
        Available:{" "}
        {book.availableCopies > 0
          ? `${book.availableCopies} of ${book.copies}`
          : "Not Available"}
      </p>
      <button
        disabled={book.availableCopies === 0}
        onClick={onBorrow}
      >
        {book.availableCopies > 0 ? "Borrow Book" : "Not Available"}
      </button>
    </div>
  );
}
