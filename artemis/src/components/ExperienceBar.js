// src/components/ExperienceBar.js
import React from 'react';

const ExperienceBar = ({ current, max, level }) => {
  const percentage = Math.min((current / max) * 100, 100);

  return (
    <div
      style={{
        marginTop: '30px',
        position: 'relative',
        width: '70%',
        height: '50px',
        marginLeft: '2%'
      }}
      aria-label={`Level ${level} with ${current} out of ${max} experience`}
    >
      {/* Progress Bar Container */}
      <div
        style={{
          position: 'absolute',
          top: '70%',
          left: '0',
          transform: 'translateY(-50%)',
          width: '100%',
          height: '20px',
          backgroundColor: 'rgb(239, 242, 216)',
          borderRadius: '7px',
          overflow: 'hidden',
          zIndex: 0,
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'rgb(242, 247, 146)',
            transition: 'width 0.5s ease-in-out'
          }}
        />
      </div>

      {/* Level Icon on the left */}
      <div
        style={{
          position: 'absolute',
          left: '0',
          width: '60px',
          height: '60px',
          zIndex: 1
        }}
      >
        <img
          src={process.env.PUBLIC_URL + '/images/pixelated-tree.jpg'}
          alt="" // Decorative image
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
        />
        <span
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontWeight: 'bold',
            fontSize: '18px',
            color: '#fff'
          }}
        >
          {level}
        </span>
      </div>
    </div>
  );
};

export default ExperienceBar;
