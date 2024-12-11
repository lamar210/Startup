import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const JournalEntriesPage = () => {
  const { email } = useAuth();
  const [journalEntries, setJournalEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJournalEntries = async () => {
      try {
        const response = await fetch(`/api/get-journal-entries?email=${encodeURIComponent(email)}`);

        if (response.ok) {
          const data = await response.json();
          setJournalEntries(data);
        } else {
          console.error('Error fetching journal entries:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching journal entries:', error);
      }
    };

    if (email) {
      fetchJournalEntries();
    }
  }, [email]);

  const handleEntryClick = (entryId) => {
    const selectedEntry = journalEntries.find(entry => entry._id === entryId);
    if (selectedEntry) {
      navigate('/journal', { state: { entryId: selectedEntry._id, content: selectedEntry.content } });
    }
  };
  
  return (
    <div className="journal-entries-page">
      <header>
        <h2>My Journal Entries</h2>
      </header>
      <main>
        <div className="entries-list">
          {journalEntries.map((entry) => (
            <div
              key={entry._id}
              onClick={() => handleEntryClick(entry._id)}
              className="journal-entry-box"
            >
              <h3>{entry.title}</h3>
              <p className="entry-date">{entry.date}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default JournalEntriesPage;
