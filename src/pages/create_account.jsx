import React from 'react';
import { Link } from 'react-router-dom';

const CreateAccount = () => {
  return (
    <div>
      <main>
        <center>
          <h2>Start Journaling</h2>
          <form action="your_server_endpoint_here" method="post">
            <p>Please enter a valid email:</p>
            <input type="text" name="email" placeholder="Email address" required />

            <p>Please enter a password:</p>
            <input type="password" name="password" placeholder="Password" required />

            <p style={{ fontSize: 'small' }}>Password must include:</p>
            <button type="submit">Continue</button>
          </form>
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
        <p>
          If you need assistance, contact support at{' '}
          <a href="mailto:lms210@byu.edu">lms210@byu.edu</a>.
        </p>
      </footer>
    </div>
  );
};

export default CreateAccount;
