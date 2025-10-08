import { useState, useEffect } from "react";
import * as booksAPI from "../../services/booksAPI";
import Loader from "../../Components/Loader";
import { toast } from "sonner";
import { FaEdit, FaTrash, FaPlus, FaSearch, FaTimes } from "react-icons/fa";

export default function ManageBook() {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
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
      toast.success("✅ Book added successfully!");
      setNewBook({ title: "", author: "", genre: "", copies: 1, price: 0 });
      loadBooks();
    } catch {
      toast.error("❌ Failed to add book");
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await booksAPI.deleteBook(id);
      toast.success("🗑️ Book deleted!");
      loadBooks();
    } catch {
      toast.error("❌ Failed to delete book");
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
      await booksAPI.editBook(editingBook.id, newBook);
      toast.success("📘 Book updated!");
      setEditingBook(null);
      setNewBook({ title: "", author: "", genre: "", copies: 1, price: 0 });
      loadBooks();
    } catch {
      toast.error("❌ Failed to update book");
    }
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()) ||
      book.genre.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <Loader />;

  return (
    <div className="admin-page">
      <h1 className="page-title">📚 Manage Books</h1>
      <p className="subtitle">Add, update, or remove books from the library.</p>

      {/* Search Bar */}
      <div className="search-bar">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search by title, author, or genre..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && <FaTimes className="clear-icon" onClick={() => setSearch("")} />}
      </div>

      {/* Add / Edit Book Form */}
      <div className="book-form">
        <h3 className="form-title">
          {editingBook ? "✏️ Edit Book" : "➕ Add New Book"}
        </h3>
        <div className="form-grid">
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
            onChange={(e) =>
              setNewBook({ ...newBook, copies: Number(e.target.value) })
            }
          />
          <input
            type="number"
            placeholder="Fee (Price)"
            value={newBook.price}
            onChange={(e) =>
              setNewBook({ ...newBook, price: Number(e.target.value) })
            }
          />
        </div>

        <div className="form-buttons">
          {editingBook ? (
            <button className="update" onClick={handleUpdateBook}>
              <FaEdit /> Update
            </button>
          ) : (
            <button className="add" onClick={handleAddBook}>
              <FaPlus /> Add Book
            </button>
          )}
          {editingBook && (
            <button
              className="cancel"
              onClick={() => {
                setEditingBook(null);
                setNewBook({
                  title: "",
                  author: "",
                  genre: "",
                  copies: 1,
                  price: 0,
                });
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      {/* Books Table */}
      <div className="table-container">
        <table className="books-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Copies</th>
              <th>Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.genre}</td>
                  <td>{book.copies}</td>
                  <td>${book.fee}</td>
                  <td>
                    <button onClick={() => handleEditBook(book)} className="edit">
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>
                  No books found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .admin-page {
          max-width: 1100px;
          margin: 0px;
          padding: 2rem;
          background: linear-gradient(135deg, #e0f2fe, #f9fafb);
          border-radius: 1rem;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.05);
          font-family: "Inter", sans-serif;
        }

        .page-title {
          text-align: center;
          font-size: 2.3rem;
          color: #4338ca;
          font-weight: 700;
        }

        .subtitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 2rem;
        }

        .search-bar {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          margin-bottom: 1.5rem;
        }

        .search-bar input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 1rem;
          color: #374151;
        }

        .search-icon {
          color: #6366f1;
        }

        .clear-icon {
          color: #ef4444;
          cursor: pointer;
        }

        .book-form {
          background: white;
          padding: 1.5rem;
          border-radius: 0.75rem;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }

        .form-title {
          font-size: 1.2rem;
          font-weight: 600;
          color: #4f46e5;
          margin-bottom: 1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
        }

        .form-grid input {
          padding: 0.75rem;
          border: 1px solid #d1d5db;
          border-radius: 0.5rem;
          outline: none;
          transition: all 0.3s ease;
        }

        .form-grid input:focus {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.2);
        }

        .form-buttons {
          margin-top: 1rem;
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.6rem 1.25rem;
          border-radius: 0.5rem;
          border: none;
          font-weight: 600;
          cursor: pointer;
          color: white;
          transition: all 0.3s;
        }

        .add {
          background: #4f46e5;
        }
        .add:hover {
          background: #4338ca;
        }

        .update {
          background: #10b981;
        }
        .update:hover {
          background: #059669;
        }

        .cancel {
          background: #9ca3af;
        }
        .cancel:hover {
          background: #6b7280;
        }

        .table-container {
          background: white;
          border-radius: 0.75rem;
          box-shadow: 0 3px 15px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        .books-table {
          width: 100%;
          border-collapse: collapse;
        }

        th,
        td {
          padding: 1rem;
          text-align: left;
        }

        th {
          background: #4f46e5;
          color: white;
          font-weight: 600;
        }

        tr:nth-child(even) {
          background: #f9fafb;
        }

        tr:hover {
          background: #eef2ff;
        }

        .edit {
          background: #10b981;
          margin-right: 0.5rem;
        }
        .edit:hover {
          background: #059669;
        }

        .delete {
          background: #ef4444;
        }
        .delete:hover {
          background: #b91c1c;
        }
      `}</style>
    </div>
  );
}
