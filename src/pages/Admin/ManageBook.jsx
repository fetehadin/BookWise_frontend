// src/pages/Admin/ManageBook.jsx
import { useState, useEffect } from "react";
import * as booksAPI from "../../services/booksAPI";
import Loader from "../../Components/Loader";
import { toast } from "sonner";

export default function ManageBook() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    copies: 1,
    price: 0,
  });

  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    setIsLoading(true);
    try {
      const data = await booksAPI.getAllBooks();
      setBooks(data);
    } catch (error) {
      toast.error("Failed to load books");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBook = async () => {
    try {
      await booksAPI.addBook(newBook);
      toast.success("Book added!");
      setNewBook({ title: "", author: "", genre: "", copies: 1, price: 0 });
      loadBooks();
    } catch (error) {
      toast.error("Failed to add book");
    }
  };

  const handleDeleteBook = async (id) => {
    try {
      await booksAPI.deleteBook(id);
      toast.success("Book deleted!");
      loadBooks();
    } catch (error) {
      toast.error("Failed to delete book");
    }
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setNewBook({
      title: book.title,
      author: book.author,
      genre: book.genre,
      copies: book.copies,
      price: book.price,
    });
  };

  const handleUpdateBook = async () => {
    try {
      await booksAPI.updateBook(editingBook.id, newBook);
      toast.success("Book updated!");
      setEditingBook(null);
      setNewBook({ title: "", author: "", genre: "", copies: 1, price: 0 });
      loadBooks();
    } catch (error) {
      toast.error("Failed to update book");
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="manage-books-container">
      <h1>Manage Books</h1>

      <div className="book-form">
        <input
          type="text"
          placeholder="Title"
          value={newBook.title}
          onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Author"
          value={newBook.author}
          onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
        />
        <input
          type="text"
          placeholder="Genre"
          value={newBook.genre}
          onChange={(e) => setNewBook({ ...newBook, genre: e.target.value })}
        />
        <input
          type="number"
          placeholder="Copies"
          value={newBook.copies}
          onChange={(e) => setNewBook({ ...newBook, copies: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Price"
          value={newBook.price}
          onChange={(e) => setNewBook({ ...newBook, price: Number(e.target.value) })}
        />
        {editingBook ? (
          <button onClick={handleUpdateBook}>Update Book</button>
        ) : (
          <button onClick={handleAddBook}>Add Book</button>
        )}
      </div>

      <div className="books-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Genre: {book.genre}</p>
            <p>Copies: {book.copies}</p>
            <p>Price: ${book.price}</p>
            <div className="actions">
              <button onClick={() => handleEditBook(book)}>Edit</button>
              <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .manage-books-container {
          max-width: 1100px;
          margin: 3rem auto;
          padding: 2rem;
          font-family: "Inter", sans-serif;
        }

        h1 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 2rem;
        }

        .book-form {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .book-form input {
          padding: 0.5rem 1rem;
          border-radius: 0.5rem;
          border: 1px solid #d1d5db;
        }

        .book-form button {
          padding: 0.5rem 1.5rem;
          border-radius: 0.5rem;
          border: none;
          background: #3b82f6;
          color: white;
          font-weight: 600;
          cursor: pointer;
        }

        .book-form button:hover {
          background: #2563eb;
        }

        .books-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
        }

        .book-card {
          padding: 1rem;
          background: #f9fafb;
          border-radius: 0.75rem;
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.08);
        }

        .book-card h3 {
          font-size: 1.25rem;
          margin-bottom: 0.25rem;
        }

        .book-card p {
          margin: 0.25rem 0;
        }

        .actions {
          display: flex;
          gap: 0.5rem;
          margin-top: 0.5rem;
        }

        .actions button {
          flex: 1;
          padding: 0.5rem;
          border-radius: 0.5rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
          color: white;
        }

        .actions button:first-child {
          background: #10b981;
        }

        .actions button:first-child:hover {
          background: #059669;
        }

        .actions button:last-child {
          background: #ef4444;
        }

        .actions button:last-child:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}
