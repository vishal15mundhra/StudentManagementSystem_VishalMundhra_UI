import React, { useState } from 'react';
import axios from 'axios';

const api = axios.create({
    baseURL: 'https://localhost:44379' // Set the base URL for API requests
});

const LoginPage = ({ setToken, history }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        api.post('/api/auth/login', { username, password })
            .then(response => {
                const token = response.data.token;
                setToken(token);
                history.push('/master');
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    };

    return (
        <div>
            <h1>Login</h1>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default LoginPage;