import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { loginUser } from "../../services/authAPI";
import { BookOpen } from "lucide-react";
import "../../styles/Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUser({ email, password });
      setAuth(data);
      navigate(data.role === "admin" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-box">
        <div className="login-page-header">
          <BookOpen size={38} className="login-page-icon" />
          <h2>Welcome Back to BookWise</h2>
          <p>Login to continue your journey</p>
        </div>

        <form className="login-page-form" onSubmit={handleSubmit}>
          <div className="login-page-form-group">
            <label className="login-page-label">Email</label>
            <input
              className="login-page-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="login-page-form-group">
            <label className="login-page-label">Password</label>
            <input
              className="login-page-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="login-page-error">{error}</p>}

          <button type="submit" className="login-page-button">
            Login
          </button>
        </form>

        <div className="login-page-footer">
          Don’t have an account? <a href="/register">Register here</a>
        </div>
      </div>
    </div>
  );
};

export default Login;