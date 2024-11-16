import React from 'react';
import './VibeChecker.css';

const VibeChecker = () => {
  return (
    <div className="vibe-checker">
      <h2>Vibe Checker</h2>
      <form>
        <label htmlFor="mood">How are you feeling today?</label>
        <input type="range" id="mood" name="mood" min="1" max="10" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default VibeChecker;
