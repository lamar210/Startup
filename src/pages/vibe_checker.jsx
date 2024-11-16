import React from 'react';
import SurveySlider from '../components/SurveySlider';
import '../style.css';

function SurveyPage() {
  return (
    <div>
      <h1>Vibe Checker</h1>
      <form>
        <p>How are you feeling today?</p>
        <SurveySlider />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SurveyPage;
