import React from 'react';
import { Link } from 'react-router-dom';
import '../style.css';

function JournalEntries() {
  return (
    <div>
      <h1>Your Journal Entries</h1>
      <div className="journal-entries">
        {/* Placeholder for entries */}
        <p>No entries yet!</p>
        <Link id="start-journaling" to="/journal-page">Start Journaling</Link>
      </div>
    </div>
  );
}

export default JournalEntries;
