import React from "react";
import BookCard from "../../Components/BookCard";

const BooksList = () => {
  const mockBooks = [
    { id: 1, title: "Book One", author: "Author A", isbn: "1111", available_copies: 3 },
    { id: 2, title: "Book Two", author: "Author B", isbn: "2222", available_copies: 5 },
  ];

  return (
    <div>
      <h2>Books List</h2>
      {mockBooks.map(book => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BooksList;
