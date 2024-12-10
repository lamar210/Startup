import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage('Account created successfully!');
      } else {
        const errorData = await response.json();
        setMessage(errorData.message || 'Make sure all password requirements are met!');
      }
    } catch (error) {
      setMessage('Network error, please try again later.');
    }
  };

  return (
    <div>
      <main>
        <center>
          <h2>Start Journaling</h2>
          <form onSubmit={handleSubmit}>
            <p>Please enter a valid email:</p>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <p>Please enter a password:</p>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <p style={{ fontSize: 'small' }}>Password must include:</p>
            <button type="submit">Continue</button>
          </form>
          {message && <p>{message}</p>}
          <p id="already have an account p">
            Already have an account? <Link to="/login">Login here</Link>
          </p>
        </center>
        <div className="conditions">
          <ul style={{ fontSize: 'small' }}>
            <li>At least 8 characters</li>
            <li>At least one lowercase letter</li>
            <li>At least one uppercase letter</li>
            <li>At least one unique character (e.g., @, #, $, %, _ )</li>
          </ul>
        </div>
      </main>
      <footer>
        <br></br>
        <p className='footer-ca'>
          If you need assistance, contact support at lms210@byu.edu
        </p>
      </footer>
    </div>
  );
};

export default CreateAccount;
