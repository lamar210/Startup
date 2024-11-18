import React, { useState } from 'react';

function VibeChecker() {
  const [isOtherTriggerChecked, IsOtherOpt] = useState(false);
  const [isOtherStrategyChecked, IsotherStrategy] = useState(false);
  const [otherTriggerValue, setOtherTriggerValue] = useState('');
  const [otherStrategyValue, setOtherStrategyValue] = useState('');
  const [moodValue, setMoodValue] = useState(5);
  const [shareFeelingsValue, setShareFeelingsValue] = useState(3);

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

  return (
    <main>
      <h2>Daily Check-In</h2>

      <form>
        <div>
          <p>1. How did you wake up feeling today?</p>
          <input 
            type="range" 
            min="1" 
            max="10" 
            value={moodValue}
            step="0.1" 
            onChange={handleMoodSlider}
          />
          <div className="slider-labels">
            <span> Really bad,<br />sad, <br />and/or numb</span>
            <span> Neutral</span>
            <span> It is a good day <br />to have a good day</span>
          </div>
          <div>
            <button type="button" aria-label="Note Entry" id="note-entry-button"> + </button>
            <input type="text" id="add-notes" aria-label="Specify" placeholder="Please specify..." />
          </div>
        </div>

        <div>
          <p>2. Did you try something out of your comfort zone today? How did it make you feel?</p>
          <textarea rows="7" cols="70" placeholder="Make sure to do it more if you enjoyed your experience :), if not express it here..." ></textarea>
        </div>

        <div>
          <p>3. What was a major trigger for your mood today?</p>
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

        <div>
          <p>4. Did you connect with someone today? How did it affect your mood?</p>
          <textarea rows="7" cols="70" placeholder="Make sure to keep the good ones in your circle, if not..." ></textarea>
        </div>

        <div>
          <p>5. What coping strategies did you use today to manage your feelings?</p>
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
        <div>
          <p>6. What do you hope to achieve by tracking your moods and feelings?</p>
          <textarea rows="7" cols="70" placeholder="Express it here..." ></textarea>
        </div>

        <div>
          <p>7. How likely are you to share your feelings with someone close to you?</p>
          <input 
            type="range" 
            min="1" 
            max="5" 
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

        <button type="submit">Submit</button>
      </form>

      <div id="message" style={{ display: 'none' }}>
        <p>Thank you for your submission!</p>
        <br />
        <p>Check your profile for results.</p>
      </div>
    </main>
  );
}

export default VibeChecker;
