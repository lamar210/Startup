import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Header() {
    const { email, logout } = useAuth() || {};

    return (
        <>
            <header>
                <h1>
                    <Link to="/main_page">Pages of Me</Link>
                </h1>
            </header>

            <nav>
                <div className="username">
                    {email ? (
                        <>
                            <Link to="/user_profile">{email}</Link>
                            {/* <button onClick={logout}>Logout</button> */}
                        </>
                    ) : (
                        <Link to="/login">Login</Link>
                    )}
                    <img
                        src="/user_logo.png"
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
