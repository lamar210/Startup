import React from 'react';
import '../styling.css';

function JournalPage() {
  return (
    <div>
      <h1>New Journal Entry</h1>
      <textarea id="journal_text" placeholder="Write your thoughts..."></textarea>
      <button id="journal-submit">Submit</button>
    </div>
  );
}

export default JournalPage;
