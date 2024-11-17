import React from 'react';
import { Link } from 'react-router-dom';

const JournalEntriesPage = () => {
  const journalEntries = JSON.parse(localStorage.getItem('journalEntries')) || [];

  return (
    <div className="journal-entries-page">
      <header>
        <h1>My Journal Entries</h1>
      </header>
      <main>
        <div className="entries-list">
          {journalEntries.map((entry, index) => (
            <Link
              key={index}
              to={`/journal-entry/${index}`}
              className="journal-entry-box"
            >
              <h3>{entry.title}</h3>
              <p className="entry-date">{entry.date}</p>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JournalEntriesPage;
