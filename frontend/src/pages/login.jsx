import React, { use, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/authprovider';

export default function login() {
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
        <div className ="login">
            <h2>login</h2>
            <form onSubmit={submit}>
                <input value={Username} onChange={e=>setUsername(e.target.value)} placeholder="username"/>
                <input value={Password} onChange={e=>setPassword(e.target.value)} placeholder="password" type="password"/>
                <button>login</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    )
}