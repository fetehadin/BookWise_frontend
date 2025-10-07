// src/pages/Admin/AdminDashboard.jsx
import { useEffect, useState } from "react";
import * as transactionsAPI from "../../services/transactionsAPI";
import * as booksAPI from "../../services/booksAPI";
// import * as usersAPI from "../../services/usersAPI"; // assume you have this
import Loader from "../../Components/Loader";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalTransactions: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const books = await booksAPI.getAllBooks();
        const users = await usersAPI.getAllUsers(); // backend endpoint
        const transactions = await transactionsAPI.getAllTransactions(); // backend endpoint

        setStats({
          totalBooks: books.length,
          totalUsers: users.length,
          totalTransactions: transactions.length,
        });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="admin-dashboard-container">
      <h1>Admin Dashboard</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>{stats.totalBooks}</h2>
          <p>Total Books</p>
        </div>
        <div className="stat-card">
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>
        <div className="stat-card">
          <h2>{stats.totalTransactions}</h2>
          <p>Total Transactions</p>
        </div>
      </div>

      <style jsx>{`
        .admin-dashboard-container {
          max-width: 1200px;
          margin: 3rem auto;
          padding: 2rem;
          font-family: "Inter", sans-serif;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        h1 {
          font-size: 2.5rem;
          color: #1f2937;
          font-weight: 800;
          text-align: center;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 15px rgba(0, 0, 0, 0.08);
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
        }

        .stat-card h2 {
          font-size: 2rem;
          color: #3b82f6;
          margin-bottom: 0.5rem;
        }

        .stat-card p {
          font-size: 1.1rem;
          color: #4b5563;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}
