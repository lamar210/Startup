import React from 'react';
import '../styling.css';

function CreateAccount() {
  return (
    <div>
      <h1>Create Account</h1>
      <form>
        <p>Username:</p>
        <input type="text" placeholder="Enter your username" required />
        <p>Email:</p>
        <input type="email" placeholder="Enter your email" required />
        <p>Password:</p>
        <input type="password" placeholder="Enter your password" required />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default CreateAccount;
