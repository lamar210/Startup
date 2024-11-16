import React, { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
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
            <button type="submit-login">Login</button>
            </div>
          </form>

          <p>Don't have an account? <a href="/create_account">Create an account</a></p>
        </center>
      </main>
    </div>
  );
};

export default Login;
