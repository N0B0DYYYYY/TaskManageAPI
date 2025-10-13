import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider.jsx';

export default function Login() {
    const [Username, setUsername] = useState('');
    const [Password, setPassword] = useState('');
    const { login } = useAuth();
    const nav = useNavigate();  
    const [error, setError] = useState(null);
    
    const submit = async (e) => {
        e.preventDefault();
        try {
            await login(Username, Password);
            nav('/');
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="form-container auth-form">
            <h2>Login</h2>
            <form onSubmit={submit}>
                <div className="form-group">
                    <label>Username</label>
                    <input className="form-input" value={Username} onChange={e=>setUsername(e.target.value)} placeholder="Enter your username"/>
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input className="form-input" value={Password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password" type="password"/>
                </div>
                <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Login</button>
                {error && <p style={{ color: 'red', textAlign: 'center', marginTop: '1rem' }}>{error}</p>}
            </form>
        </div>
    )
}