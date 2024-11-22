import React, { useState } from 'react';
import { loginUser } from '../services/user_services';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email, password });
      localStorage.setItem('token', data.token); 
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
      />
      {error && <p>{error}</p>}
      <button type="submit">Login</button>
    </form>
  );
};

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
    localStorage.setItem('userEmail', email);
    window.location.href = '/main_page';
  };

  return (
    <div className="login-page">
      <main>
        <center>
          <h2>Login to Your Account</h2>
          <form onSubmit={handleSubmit}>
            <p>Please enter your email:</p>
            <input
              type="text"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Email address"
              required
            />
            <p>Please enter your password:</p>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Password"
              required
            />
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

export default Login;
