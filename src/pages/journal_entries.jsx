import React from 'react';
import { Link } from 'react-router-dom';


const JournalEntriesPage = () => {
    const getDate = () => {
        const today = new Date();
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        return today.toLocaleDateString('en-US', options);
    };
    const journalEntries = [
        { id: 1, title: 'Entry 1', date: getDate() },
        { id: 2, title: 'Entry 2', date: getDate() },
        { id: 3, title: 'Entry 3', date: getDate() }
    ];

    return (
        <div className="journal-entries-page">
            <header>
                <h1>My Journal Entries</h1>
            </header>

            <main>
                <div className="entries-list">
                    {journalEntries.map((entry) => (
                        <Link 
                            key={entry.id}
                            to={`/journal/${entry.id}`}
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
