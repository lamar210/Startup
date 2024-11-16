import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>
                <Link to="/main_page">Pages of Me</Link>
            </h1>
            <div className="username">
                <Link to="/user_profile">UserName</Link>
                <img className="account-icon" src="/path-to-icon.png" alt="Account Icon" />
            </div>
        </header>
    );
}

export default Header;
