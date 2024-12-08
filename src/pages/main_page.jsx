import React from 'react';
import { Link } from 'react-router-dom';

const MainPage = () => {
  return (
    <div className="main-page">
  
      <main>
        <center>
          <h2 id="start-journaling">
            <Link to="/login">Start Journaling</Link>
          </h2>
          <img
            id="main-image"
            src="https://i.pinimg.com/564x/57/d1/3a/57d13a1a19e2941e1ff00c2be0e84b2f.jpg"
            alt="Website Image"
          />
          <div>
            <div>Lamar Salama</div>
            <a
              href="https://github.com/lamar210/Startup.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </div>
        </center>
      </main>

      <footer>
        <div>
          <div>
            <br></br>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainPage;
