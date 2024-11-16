import React from 'react';
import { Link } from 'react-router-dom';
import '../styling.css';

function MainPage() {
  return (
    <div>
      <header className="main-header">
        <h1>
          <a href="/">Pages of Me</a>
        </h1>
      </header>
      <div className="nav-links">
        <Link className="button" to="/journal-entries">My Journal</Link>
        <Link className="button" to="/survey">Vibe Checker</Link>
      </div>
    </div>
  );
}

export default MainPage;
