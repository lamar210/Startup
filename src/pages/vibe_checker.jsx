import React, { useState, useContext } from 'react';
import { useAuth } from '../AuthContext';

function VibeChecker() {
  const { email } = useAuth();
  const [isOtherTriggerChecked, IsOtherOpt] = useState(false);
  const [isOtherStrategyChecked, IsotherStrategy] = useState(false);
  const [otherTriggerValue, setOtherTriggerValue] = useState('');
  const [otherStrategyValue, setOtherStrategyValue] = useState('');
  const [moodValue, setMoodValue] = useState(5);
  const [shareFeelingsValue, setShareFeelingsValue] = useState(3);
  const [energyValue, setEnergyValue] = useState(5);
  const [message, setMessage] = useState('');

  const handleOtherTrigger = (event) => {
    IsOtherOpt(event.target.checked);
    if (!event.target.checked) {
      setOtherTriggerValue('');
    }
  };
  const handleOtherStrategy = (event) => {
    IsotherStrategy(event.target.checked);
    if (!event.target.checked) {
      setOtherStrategyValue('');
    }
  };

  const handleOtherTriggerInput = (event) => {
    setOtherTriggerValue(event.target.value);
  };

  const handleOtherStrategyInputChange = (event) => {
    setOtherStrategyValue(event.target.value);
  };

  const handleMoodSlider = (event) => {
    setMoodValue(event.target.value);
  };

  const handleShareFeelingsSlider = (event) => {
    setShareFeelingsValue(event.target.value);
  };

  const handleEnergySlider = (event) => {
    setEnergyValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage('You need to be logged in to submit the form!');
      return;
    }

    const formData = {
      email,
      mood: moodValue,
      shareFeelings: shareFeelingsValue,
      energy: energyValue,
      otherTrigger: isOtherTriggerChecked ? otherTriggerValue : '',
      otherStrategy: isOtherStrategyChecked ? otherStrategyValue : '',
      scores: {
        happiness: moodValue,
        stress: shareFeelingsValue,
        energy: energyValue,
      },
    };

    try {
      const response = await fetch('/api/save-scores', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        setMessage(data.message || 'Thank you for your submission!');
      } else {
        setMessage(data.error || 'There was an issue with your submission. Please try again.');
      }
    } catch (err) {
      setMessage('There was an issue with your submission. Please try again.');
    }
  };

  const handleWeatherClick = async () => {
    const apiBase = 'https://dragon.best/api/glax_weather.json';
    const params = {
      lat: '7.4474',
      lon: '46.9481',
      units: 'metric',
    };

    const queryString = new URLSearchParams(params).toString();
    const apiUrl = `${apiBase}?${queryString}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      setMessage(`Weather: ${data.weather || 'N/A'}`);
    } catch (error) {
      setMessage('Weather data fetch failed.');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setMessage('');
    }
  };

  return (
    <main>
      <h2>Daily Check-In</h2>

      <form onSubmit={handleSubmit}>
        <div className='question-container'>
          <div className='question-container'>1. How did you wake up feeling today?</div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={moodValue}
            step="0.1" 
            onChange={handleMoodSlider}
          />
          <div className="slider-labels">
            <span>Really bad,<br />sad, <br />and/or numb</span>
            <span>Neutral</span>
            <span>It is a good day <br />to have a good day</span>
          </div>
        </div>

        <div className='question-container'>
          <div className='question-container'>2. Did you try something out of your comfort zone today? How did it make you feel?</div>
          <textarea rows="7" cols="70" placeholder="Make sure to do it more if you enjoyed your experience :), if not express it here..." ></textarea>
        </div>

        <div className='question-container'>
          <div className='question-container'>3. What was a major trigger for your mood today?</div>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="trigger" value="school" /> School or academic stress
            </label><br />
            <label>
              <input type="checkbox" name="trigger" value="parents" /> Parents or relatives
            </label><br />
            <label>
              <input type="checkbox" name="trigger" value="friends" /> Friends
            </label><br />
            <label>
              <input 
                type="checkbox" 
                name="trigger" 
                value="other" 
                id="trigger-other" 
                checked={isOtherTriggerChecked} 
                onChange={handleOtherTrigger}
              />
              Other:
            </label>
            {isOtherTriggerChecked && (
              <input 
                type="text" 
                id="other_trigger" 
                aria-label="Specify other trigger" 
                placeholder="Please specify..." 
                value={otherTriggerValue} 
                onChange={handleOtherTriggerInput}
              />
            )}
          </div>
        </div>

        <div className='question-container'>
          <div className='question-container'>4. Did you connect with someone today? How did it affect your mood?</div>
          <textarea rows="7" cols="70" placeholder="Make sure to keep the good ones in your circle, if not..." ></textarea>
        </div>

        <div className='question-container'>
          <div className='question-container'>5. What coping strategies did you use today to manage your feelings?</div>
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="strategy" value="walk" /> A walk with nature
            </label><br />
            <label>
              <input type="checkbox" name="strategy" value="movie" /> Watched a movie or a tv show
            </label><br />
            <label>
              <input type="checkbox" name="strategy" value="eating" /> Eating or snacking
            </label><br />
            <label>
              <input 
                type="checkbox" 
                name="strategy" 
                value="other" 
                id="strategy-other" 
                checked={isOtherStrategyChecked} 
                onChange={handleOtherStrategy}
              />
              Other:
            </label>
            {isOtherStrategyChecked && (
              <input 
                type="text" 
                id="other_strategy" 
                aria-label="Specify other strategy" 
                placeholder="Please specify..." 
                value={otherStrategyValue} 
                onChange={handleOtherStrategyInputChange}
              />
            )}
          </div>
        </div>
        <div className='question-container'>
          <div className='question-container'>6. What do you hope to achieve by tracking your moods and feelings?</div>
          <textarea rows="7" cols="70" placeholder="Express it here..." ></textarea>
        </div>

        <div className='question-container'>
          <div className='question-container'>7. How likely are you to share your feelings with someone close to you?</div>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={shareFeelingsValue}
            step="0.1" 
            onChange={handleShareFeelingsSlider}
          />
          <div className="slider-labels">
            <span>Not likely</span>
            <span>Maybe (depends on the person)</span>
            <span>Very likely</span>
          </div>
        </div>

        <div className='question-container'>
          <div className='question-container'>8. How much energy do you feel today?</div>
          <input
            type="range"
            min="1"
            max="10"
            value={energyValue} 
            step="0.1"
            onChange={handleEnergySlider}
          />
          <div className="slider-labels">
            <span>Very low energy</span>
            <span>Neutral</span>
            <span>Very high energy</span>
          </div>
        </div>

        <button type="submit">Submit</button>
      </form>

      <button className="weather-button" type="button" onClick={handleWeatherClick}>
        🌤
      </button>
      {message && (
        <div className="message-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <h2>{message}</h2>
          </div>
        </div>
      )}

    </main>
  );
}

export default VibeChecker;