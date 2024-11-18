import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <header>
                <h1>
                    <Link to="/main_page">Pages of Me</Link>
                </h1>
            </header>

            <nav>
                <div className="username">
                    <Link to="/user_profile">username@email.com</Link>
                    <img 
                        src="C:Users\USER\Downloads\usernamelogo.jpeg" 
                        alt="Account Icon" 
                        className="account-icon" 
                    />
                </div>

                <div className="nav-links">
                    <Link to="/journal" className="button">My Journal</Link>
                    <Link to="/vibe_checker" className="button">Vibe Checker</Link>
                </div>
            </nav>
        </>
    );
}

export default Header;
