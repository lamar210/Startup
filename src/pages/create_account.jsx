import React, { useState } from 'react';
import '../styling.css';

function CreateAccount() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (username && email && password) {
            console.log('Account created:', { username, email, password });
        } else {
            console.log('Please fill out all fields');
        }
    };
    return (
        <div className="create-account">
            <h1>Create Account</h1>
            <form onSubmit={handleSubmit}>
                <p>Username:</p>
                <input>
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                </input>
                <p>Email:</p>
                <input>
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                </input>
                <p>Password:</p>
                <input>
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                </input>
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}
export default CreateAccount;
