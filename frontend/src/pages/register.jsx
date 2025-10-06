import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authprovider';
import api from '../api/api';

function register() {
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');

    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleRegister = async (e) => {
    e.preventDefault(); // stop page reload on form submit

    try {
      // send POST request to /api/register/
      const res = await api.post("/register/", {
        username: Username,
        password: Password,
        email: Email,
      });

      console.log("User registered:", res.data);

      // after successful register → redirect to login
      navigate("/login");

    } catch (err) {
      console.error("Registration failed:", err.response?.data || err.message);
      setError("Registration failed. Try again.");
    }
  };



    return (
        <div className="register" style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Email:</label><br />
                    <input type="email" 
                    value = {Email}
                    onChange = {(e) => setEmail(e.target.value)}
                    required/> 
                </div>
                <div>
                    <label>Username:</label><br />
                    <input type="text"
                    value = {Username}
                    onChange = {(e) => setUsername(e.target.value)}
                    required/>
                </div>
                <div>
                    <label>Password:</label><br />
                    <input type="password"
                    value = {Password}
                    onChange = {(e) => setPassword(e.target.value)}
                    required/>
                </div>
                <button type="submit" style={{ marginTop: '10px' }}>Register</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>

        </div>
    );
}
export default register;