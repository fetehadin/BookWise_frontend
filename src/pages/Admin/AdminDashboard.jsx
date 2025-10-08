import { useEffect, useState } from "react";
import { FaBook, FaUsers, FaExchangeAlt } from "react-icons/fa";
import * as transactionsAPI from "../../services/transactionsAPI";
import * as booksAPI from "../../services/booksAPI";
// import * as usersAPI from "../../services/usersAPI";
import Loader from "../../Components/Loader";

export default function AdminDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalUsers: 0,
    totalTransactions: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const books = await booksAPI.getAllBooks();
        const users = [
          { id: 1, name: "Alice" },
          { id: 2, name: "Bob" },
          { id: 3, name: "Charlie" },
        ];
        const transactions = [
          { id: 1, bookTitle: "The power of now", userName: "Fetehadin", date: "2025-10-05" },
          { id: 2, bookTitle: "Atomic habits", userName: "Abebe", date: "2025-10-04" },
          { id: 3, bookTitle: "To Kill a Mockingbird", userName: "Fetehadin", date: "2025-10-03" },
        ];

        setStats({
          totalBooks: books.length,
          totalUsers: users.length,
          totalTransactions: transactions.length,
        });

        // Show last 5 activities
        setRecentActivities(transactions.slice(0, 5));
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="admin-dashboard-container">
      <h1>📊 Admin Dashboard</h1>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card blue">
          <div className="icon"><FaBook /></div>
          <h2>{stats.totalBooks}</h2>
          <p>Total Books</p>
        </div>
        <div className="stat-card green">
          <div className="icon"><FaUsers /></div>
          <h2>{stats.totalUsers}</h2>
          <p>Total Users</p>
        </div>
        <div className="stat-card purple">
          <div className="icon"><FaExchangeAlt /></div>
          <h2>{stats.totalTransactions}</h2>
          <p>Total Transactions</p>
        </div>
      </div>

      {/* Recent Activities Table */}
      <div className="recent-activities">
        <h2>🕒 Recent Activities</h2>
        {recentActivities.length === 0 ? (
          <p>No recent activities.</p>
        ) : (
          <table className="activities-table">
            <thead>
              <tr>
                <th>📖 Book</th>
                <th>👤 User</th>
                <th>📅 Date</th>
              </tr>
            </thead>
            <tbody>
              {recentActivities.map((activity) => (
                <tr key={activity.id}>
                  <td>{activity.bookTitle}</td>
                  <td>{activity.userName}</td>
                  <td>{activity.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <style jsx>{`
      body{margin : 0px
      }
        .admin-dashboard-container {
          max-width: 1200px;
          margin: 0px;
          padding: 2rem;
          font-family: "Inter", sans-serif;
          display: flex;
            background: linear-gradient(135deg, #e0f2fe, #f9fafb);
          flex-direction: column;
          gap: 2rem;
        }

        h1 {
          font-size: 2.5rem;
          font-weight: 800;
          text-align: center;
          color: #1e3a8a;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 2rem;
        }

        .stat-card {
          background: white;
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: 0 10px 15px rgba(0,0,0,0.08);
          text-align: center;
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 25px rgba(0,0,0,0.15);
        }

        .stat-card .icon {
          font-size: 2.5rem;
          margin-bottom: 0.75rem;
          color: white;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          margin-left: auto;
          margin-right: auto;
        }

        .stat-card.blue .icon { background-color: #3b82f6; }
        .stat-card.green .icon { background-color: #10b981; }
        .stat-card.purple .icon { background-color: #8b5cf6; }

        .stat-card h2 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
          color: #111827;
        }

        .stat-card p {
          font-size: 1.1rem;
          color: #6b7280;
          font-weight: 600;
        }

        .recent-activities {
          margin-top: 2rem;
        }

        .recent-activities h2 {
          font-size: 1.8rem;
          color: #1f2937;
          margin-bottom: 1rem;
        }

        .activities-table {
          width: 100%;
          border-collapse: collapse;
        }

        .activities-table th, .activities-table td {
          padding: 0.75rem 1rem;
          border-bottom: 1px solid #e5e7eb;
          text-align: left;
        }

        .activities-table th {
          background-color: #f3f4f6;
          font-weight: 600;
          color: #1f2937;
        }

        .activities-table td {
          color: #374151;
        }

        @media (max-width: 640px) {
          .stats-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
