import React, { useState, useContext } from 'react';
import { useAuth } from '../AuthContext';
import { useNotification } from '../notification';

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
  const { showNotification } = useNotification();
  const [notifications, setNotifications] = useState([])

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
        showNotification('Survey entry saved!');
        let port = window.location.port;
        const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
        const ws = new WebSocket(`${protocol}://${window.location.hostname}:${port}`);
        // const ws = new WebSocket('ws://localhost:4000');

        ws.onopen = () => {
          console.log('WebSocket connection opened');
          ws.send(JSON.stringify('Other users have submitted the survey! Charts are updated!' ));
        };
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (data.type === 'notification') {
              console.log('Received notification:', data.message);
              showNotification(data.message);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
        
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
        
        ws.onclose = () => {
          console.log('WebSocket connection closed');
        };
        
      } else {
        setMessage(data.error || 'There was an issue with your submission. Please try again.');
      }
    } catch (err) {
      setMessage('There was an issue with your submission. Please try again.');
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          console.log('Latitude:', lat); 
          console.log('Longitude:', lon);
          handleWeatherClick(lat, lon);
        },
        (error) => {
          console.error('Error fetching location:', error);
          setMessage('Unable to retrieve your location');
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
      setMessage('Geolocation is not supported by your browser.');
    }
  };
  
  const handleWeatherClick = async (lat, lon) => {
    const apiKey = '66d58455c018da1d26792a5cff863c85';
    if (typeof lat !== 'number' || typeof lon !== 'number') {
      console.error('Invalid latitude or longitude');
      setMessage('Invalid location data');
      return;
    }
  
    console.log(`Fetching weather data for lat: ${lat}, lon: ${lon}`);
  
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (response.ok) {
        console.log(data);
        if (data.weather && data.weather.length > 0) {
          setMessage(`Weather in ${data.name}: ${data.weather[0].description || 'N/A'}, Temperature: ${data.main.temp}°C`);
        } else {
          setMessage('Weather data not available.');
        }
      } else {
        console.log(data);
        setMessage(data.message || 'Weather data fetch failed.');
      }
    } catch (error) {
      console.error('Weather fetch error:', error);
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
            <span>Very likely</span>
            <span>Maybe (depends on the person)</span>
            <span>Not likely</span>
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

      <button className="weather-button" type="button" onClick={getUserLocation}>
        🌤
      </button>
      {message && (
        <div className="message-overlay" onClick={handleOverlayClick}>
          <div className="modal-content">
            <h2>{message}</h2>
          </div>
        </div>
      )}

      {notifications.length > 0 && (
        <Notification message={notifications[0]} />
      )}

    </main>
  );
}

export default VibeChecker;