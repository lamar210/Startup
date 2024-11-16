import React from 'react';

const MainPage = () => {
  return (
    <div className="main-page">
      <header>
        <h1>
          <a href="/">Pages of Me</a>
        </h1>
      </header>

      <nav>
        <div className="username">
          <a href="/users_profile">
            username@example.com
            <img
              src="https://previews.dropbox.com/p/thumb/ACZKksw04Q5Pm9jBp8_4sBklRgU-vuB9SiP9oahy5onW59KuuPBChU0YJc15SkJRNJm50Ux_u9Pv2rVrL83i_e3Ckn2m74vF8O3ZNTygPSpn2SmKFFBZ4IL0rbnCDPCPfI80oVZAjRTdp4e5aA0N3oyEwZpetbDEMOor9KTIAkg_Kle2a6GjzpukCWqCooD0sreLQNQOhCfsDiwANGee_LI4hkcVbpenCONAPQhp-GxwC2SJ0YcCTCOHmr4Sdss_lvC2BQbd2VvaNqgj6RaG0A1510bzkgZ1tXJtyKJKHzznj2uw4aICEZn0rb2xk7d9Ut1LKs02souW-lEZ0qoJ1g2J/p.jpeg?is_prewarmed=true"
              alt="Account Icon"
              className="account-icon"
            />
          </a>
        </div>

        <div className="nav-links">
          <a href="/journal" className="button">My Journal</a>
          <a href="/vibe_checker" className="button">Vibe Checker</a>
        </div>
      </nav>

      <main>
        <center>
          <h2 id="start-journaling">
            <a href="/login">Start Journaling</a>
          </h2>
          <img
            id="main-image"
            src="https://i.pinimg.com/564x/57/d1/3a/57d13a1a19e2941e1ff00c2be0e84b2f.jpg"
            alt="Website Image"
          />
          <p>
            <p>Lamar Salama</p>
            <a href="https://github.com/lamar210/Startup.git" target="_blank" rel="noopener noreferrer">
              Github
            </a>
          </p>
        </center>
      </main>

      <footer>
        <div>
          <p>//placeholder: Real-time updates will appear here (such as notified reminders to do the daily check-in and/or journal entry).</p>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
