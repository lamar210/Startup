import React from 'react';
import { Link } from 'react-router-dom';
import '../styling.css';

function JournalEntries() {
  return (
    <div className="journal-entries-container">
      <h1>Your Journal Entries</h1>
      <div className="journal-entries">
        {/* Placeholder for entries */}
        <p>No entries yet! Start journaling to record your thoughts.</p>
        <Link id="start-journaling" className="start-journaling-button" to="/journal-page">
          Start Journaling
        </Link>
      </div>
    </div>
  );
}

export default JournalEntries;
