import React from 'react';
import '../style.css';

function LoginPage() {
  return (
    <div>
      <h1>Login</h1>
      <form>
        <p>Email:</p>
        <input type="email" placeholder="Enter your email" required />
        <p>Password:</p>
        <input type="password" placeholder="Enter your password" required />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
