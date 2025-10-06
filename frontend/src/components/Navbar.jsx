import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Tasks</Link>
      <Link to="/create" style={{ marginRight: "10px" }}>New Task</Link>
      <Link to="/login">Login</Link>
    </nav>
  );
}

export default Navbar;
