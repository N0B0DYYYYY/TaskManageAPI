import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api.js';

function Register() {
    const [Username, setUsername] = useState('');
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await api.post("/api/register/", {
                username: Username,
                password: Password,
                email: Email,
            });
            navigate("/api/login");
        } catch (err) {
            console.error("Registration failed:", err.response?.data || err.message);
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="form-container auth-form">
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <div className="form-group">
                    <label>Email</label>
                    <input type="email" value={Email} onChange={(e) => setEmail(e.target.value)} required className="form-input" /> 
                </div>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" value={Username} onChange={(e) => setUsername(e.target.value)} required className="form-input" />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" value={Password} onChange={(e) => setPassword(e.target.value)} required className="form-input" />
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Register</button>
                {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
            </form>
        </div>
    );
}

export default Register;