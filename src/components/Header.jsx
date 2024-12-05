import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch('/api/current-user', { method: 'GET', credentials: 'include' });
                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                }
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUser();
    }, []);

    return (
        <>
            <header>
                <h1>
                    <Link to="/main_page">Pages of Me</Link>
                </h1>
            </header>

            <nav>
                <div className="username">
                    {user ? (
                        <Link to="/user_profile">{user.email}</Link>
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
