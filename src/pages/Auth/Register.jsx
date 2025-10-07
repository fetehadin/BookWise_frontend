import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authAPI";
import { BookOpen } from "lucide-react";
import "../../styles/Register.css";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await registerUser({ name, email, password });
      alert("Registration successful!");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <div className="register-header">
          <BookOpen size={40} className="register-icon" />
          <h2>Welcome to BookWise</h2>
          <p>Create your free account to get started</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-form-group">
            <label className="register-label">Full Name</label>
            <input
              className="register-input"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label className="register-label">Email</label>
            <input
              className="register-input"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="register-form-group">
            <label className="register-label">Password</label>
            <input
              className="register-input"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="register-error">{error}</p>}

          <button type="submit" className="register-button" disabled={loading}>
            {loading ? "Registering..." : "Create Free Account"}
          </button>
        </form>

        <div className="register-footer">
          Already have an account? <a href="/login">Login</a>
        </div>
      </div>
    </div>
  );
};

export default Register;
