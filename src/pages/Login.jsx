import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                login(email);
                navigate('/user_profile');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Login failed. Please try again later.');
        }
    };

    return (
        <div className="login-page">
            <main>
                <center>
                    <h2>Login to Your Account</h2>
                    <form onSubmit={handleLogin}>
                        <p>Please enter your email:</p>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            required
                        />
                        <p>Please enter your password:</p>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                        />
                        {error && <p>{error}</p>}
                        <div>
                            <button type="submit">Login</button>
                        </div>
                    </form>
                    <p>Don't have an account? <a href="/create_account">Create an account</a></p>
                </center>
            </main>
        </div>
    );
};

export default LoginPage;
