import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider.jsx";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/api/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/">TaskMaster</Link>
      </div>
      <div className="navbar-links">
        {user ? (
          <div className="navbar-user-info">
            <span className="navbar-username">Hello, {user.username}</span>
            <Link to="/">My Tasks</Link>
            <Link to="/all-tasks">All Tasks</Link>
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;