import React from 'react';
import './Journal.css';

const Journal = () => {
  return (
    <div className="journal">
      <h2>My Journal</h2>
      <textarea
        id="journal_text"
        placeholder="Write your thoughts here..."
      ></textarea>
    </div>
  );
};

export default Journal;
