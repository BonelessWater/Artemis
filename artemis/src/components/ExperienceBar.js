// src/components/ExperienceBar.js
import React from 'react';

const ExperienceBar = ({ current, max, level }) => {
  // Calculate the fill percentage (capped at 100%)
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
      {/* Level Icon */}
      <div style={{ marginRight: '10px' }}>
        <img 
          src={process.env.PUBLIC_URL + '/images/level_icon.png'} 
          alt={`Level ${level}`} 
          style={{ width: '50px', height: '50px' }} 
        />
      </div>

      {/* Experience Bar Container */}
      <div 
        style={{ 
          flex: 1, 
          height: '20px', 
          backgroundColor: '#ccc', 
          borderRadius: '10px', 
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        {/* Experience Bar Fill */}
        <div 
          style={{ 
            width: `${percentage}%`, 
            height: '100%', 
            backgroundColor: '#83CC6D',
            borderRadius: '10px',
            transition: 'width 0.5s ease-in-out'
          }}
        />
        {/* Optional: Display current exp text inside the bar */}
        <span 
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '12px',
            fontWeight: 'bold',
            color: '#fff'
          }}
        >
          {current} / {max}
        </span>
      </div>

      {/* Level Text */}
      <div style={{ marginLeft: '10px', fontWeight: 'bold' }}>
        Level {level}
      </div>
    </div>
  );
};

export default ExperienceBar;
