import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from '@nivo/bar';

function UserProfile() {
  const [moodScores, setMoodScores] = useState({
    happiness: 0,
    stress: 0,
    energy: 0,
  });

  useEffect(() => {
    const savedScores = JSON.parse(localStorage.getItem('surveyData'));
    if (savedScores) {
      setMoodScores({
        happiness: savedScores.happiness,
        stress: savedScores.stress,
        energy: savedScores.energy,
      });
    }
  }, []);
  const getMessage = () => {
    const { happiness, stress, energy } = moodScores;
    if (stress > happiness) {
      return (
        <p>
          Your moods have been down lately. Consider reaching out to someone you trust or engaging in activities that
          uplift you. Remember, it's okay to not be okay. Always ask for help when you need it.
        </p>
      );
    } else if (happiness >= stress && happiness >= energy) {
      return (
        <p>
          You are doing great! You have managed to keep up with healthy habits, and your moods have been positive. Keep
          it up and continue to engage in activities that bring you calmness and joy! Remember it is a good day to have
          a good day.
        </p>
      );
    }
    return null;
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
          <h3>Reflection</h3>
          {getMessage()}
        </div>

        <h3>Your Previous Journal Entries</h3>
        <div>
          <a href="/journal_entries">Journal entries</a>
        </div>
      </main>
    </div>
  );
}

export default UserProfile;
