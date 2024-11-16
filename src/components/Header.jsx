import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <>
            <header>
                <h1>
                    <Link to="/journal">Pages of Me</Link>
                </h1>
            </header>

            <nav>
                <div className="username">
                    <Link to="/user_profile">username@example.com</Link>
                    <img 
                        src="https://previews.dropbox.com/p/thumb/ACZKksw04Q5Pm9jBp8_4sBklRgU-vuB9SiP9oahy5onW59KuuPBChU0YJc15SkJRNJm50Ux_u9Pv2rVrL83i_e3Ckn2m74vF8O3ZNTygPSpn2SmKFFBZ4IL0rbnCDPCPfI80oVZAjRTdp4e5aA0N3oyEwZpetbDEMOor9KTIAkg_Kle2a6GjzpukCWqCooD0sreLQNQOhCfsDiwANGee_LI4hkcVbpenCONAPQhp-GxwC2SJ0YcCTCOHmr4Sdss_lvC2BQbd2VvaNqgj6RaG0A1510bzkgZ1tXJtyKJKHzznj2uw4aICEZn0rb2xk7d9Ut1LKs02souW-lEZ0qoJ1g2J/p.jpeg?is_prewarmed=true" 
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
