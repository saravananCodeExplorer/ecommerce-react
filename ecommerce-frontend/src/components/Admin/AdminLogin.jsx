import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css"; // Add your CSS file

const AdminLogin = () => {
  const [admin, setAdmin] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      const res = await axios.post("http://localhost:5000/admin/login", admin);

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token); // Store token
        navigate("/admindashboard"); // Redirect to admin dashboard
      } else {
        setError(res.data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="admin-login-container">
      <h2>Admin Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="login-form">
        <input type="email" name="email" placeholder="Admin Email" value={admin.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={admin.password} onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
