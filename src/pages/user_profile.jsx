import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function UserProfile() {
  const [moodScores, setMoodScores] = useState({
    happiness: 0,
    stress: 0,
    energy: 0,
  });
  const [moodMessage, setMoodMessage] = useState('');
  const { email, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMoodScores = async () => {
      try {
        const response = await fetch('/api/get-scores', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
          const data = await response.json();
          setMoodScores({
            happiness: data.happiness || 0,
            stress: data.stress || 0,
            energy: data.energy || 0,
          });
        } else {
          setMoodScores({ happiness: 0, stress: 0, energy: 0 });
        }
      } catch (error) {
        console.error('Failed to fetch mood scores:', error);
        setMoodScores({ happiness: 0, stress: 0, energy: 0 });
      }
    };

    const fetchMoodMessage = async () => {
      try {
        const response = await fetch('/api/evaluate-mood-message', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const data = await response.json();
          setMoodMessage(data.message);
        } else {
          setMoodMessage('Complete the survey for a reflection!');
        }
      } catch (error) {
        console.error('Failed to fetch mood message:', error);
        setMoodMessage('An error occurred while fetching your mood message.');
      }
    };

    if (email) {
      fetchMoodScores();
      fetchMoodMessage();
    }
  }, [email]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const data = [
    {
      mood: 'Happiness',
      YourScore: moodScores.happiness,
      Others: 75,
    },
    {
      mood: 'Stress',
      YourScore: moodScores.stress,
      Others: 60,
    },
    {
      mood: 'Energy',
      YourScore: moodScores.energy,
      Others: 80,
    },
  ];
  const chartSettings = {
    keys: ['YourScore', 'Others'],
    indexBy: 'mood',
    margin: { top: 50, right: 130, bottom: 50, left: 60 },
    padding: 0.3,
    colors: ({ id }) => (id === 'YourScore' ? 'rgb(203, 97, 97)' : '#FFFACD'),
    borderColor: { from: 'color', modifiers: [['darker', 1.6]] },
    axisBottom: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Mood',
      legendPosition: 'middle',
      legendOffset: 32,
    },
    axisLeft: {
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: 'Score',
      legendPosition: 'middle',
      legendOffset: -40,
    },
    legends: [
      {
        dataFrom: 'keys',
        anchor: 'bottom-right',
        direction: 'column',
        justify: false,
        translateX: 120,
        translateY: 0,
        itemsSpacing: 2,
        itemWidth: 100,
        itemHeight: 20,
        itemDirection: 'left-to-right',
        itemOpacity: 0.85,
        symbolSize: 20,
        effects: [
          {
            on: 'hover',
            style: {
              itemOpacity: 1,
            },
          },
        ],
      },
    ],
    enableLabel: false,
  };

  return (
    <div>
      <main>
        <h2>Mood Statistics</h2>
        <p>Your mood statistics are represented below:</p>
        <p>And this many people have shared the same emotions and moods as you-- you are not alone in this.</p>

        <div style={{ height: '400px' }}>
          <ResponsiveBar data={data} {...chartSettings} />
        </div>

        <div>
          <h3>Your Mood Reflection</h3>
          <p>{moodMessage}</p>
        </div>

        <h3>Your Previous Journal Entries</h3>
        <div>
          <a href="/journal_entries">Journal entries</a>
        </div>
        <button className="logout-button" onClick={handleLogout}>Logout</button>
      </main>
    </div>
  );
}

export default UserProfile;
