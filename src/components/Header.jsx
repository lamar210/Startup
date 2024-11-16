import React from 'react';

function Header() {
    return (
        <header>
            <h1>
                <a href="/">Pages of Me</a>
            </h1>
            <div className="username">
                <a href="/profile">UserName</a>
                <img className="account-icon" src="/path-to-icon.png" alt="Account Icon" />
            </div>
        </header>
    );
}

export default Header;
