import React, { useState } from 'react';

const SurveySlider = () => {
    const [sliderValue, setSliderValue] = useState(50);

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    return (
        <div>
            <label htmlFor="survey-slider">Rate your experience: </label>
            <input 
                type="range" 
                id="survey-slider" 
                min="0" 
                max="100" 
                value={sliderValue} 
                onChange={handleSliderChange} 
                style={{ width: '100%' }}
            />
            <div>
                <span>{sliderValue}</span>
            </div>
        </div>
    );
};

export default SurveySlider;
