import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const JournalEntriesPage = () => {
  const [journalEntries, setJournalEntries] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/journal-entries');
        const data = await response.json();
        setJournalEntries(data);
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="journal-entries-page">
      <header>
        <h2>My Journal Entries</h2>
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
