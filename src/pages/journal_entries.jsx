import React from 'react';
import Header from '../components/Header';

const Journal = () => {
  return (
    <div>
      <Header />
      <main>
        <h2>Journal Entries</h2>
        <div>
          <p>Entry #1: Feeling happy and accomplished today! 
          <br />
          - Date: August 28, 2024</p>
          <p>Entry #2: A bit stressed but managing. 
          <br />
          - Date: August 29, 2024</p>
        </div>
      </main>
      <footer>
        <p>Data retrieved from the database.</p>
      </footer>
    </div>
  );
};

export default Journal;
