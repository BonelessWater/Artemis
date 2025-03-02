// Body.jsx
import React, { useState, useEffect, useRef } from 'react';
import ExperienceBar from './ExperienceBar';
import CartoonyButton from './CartoonyButton';

// SosSlider Component – Slide from right to left to confirm SOS
const SosSlider = ({ onConfirm }) => {
  const sliderRef = useRef(null);
  const handleRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [handleLeft, setHandleLeft] = useState(null);

  // Set initial handle position (right aligned)
  useEffect(() => {
    if (sliderRef.current && handleRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const handleWidth = handleRef.current.offsetWidth;
      setHandleLeft(sliderWidth - handleWidth);
    }
  }, []);

  const onMouseDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(true);
    setStartX(e.clientX);
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    e.stopPropagation();
    e.preventDefault();
    if (sliderRef.current && handleRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const handleWidth = handleRef.current.offsetWidth;
      const dx = e.clientX - startX;
      setHandleLeft((prev) => {
        let newLeft = (prev !== null ? prev + dx : 0);
        if (newLeft < 0) newLeft = 0;
        if (newLeft > sliderWidth - handleWidth) newLeft = sliderWidth - handleWidth;
        return newLeft;
      });
      setStartX(e.clientX);
    }
  };

  const onMouseUp = (e) => {
    if (!dragging) return;
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
    // If the handle has been dragged far enough left (e.g., less than 20px), confirm SOS
    if (handleLeft !== null && handleLeft < 20) {
      if (onConfirm) onConfirm();
    } else {
      // Reset the handle to the right side
      if (sliderRef.current && handleRef.current) {
        const sliderWidth = sliderRef.current.offsetWidth;
        const handleWidth = handleRef.current.offsetWidth;
        setHandleLeft(sliderWidth - handleWidth);
      }
    }
  };

  return (
    <div
      ref={sliderRef}
      style={{
        position: 'relative',
        width: '300px',
        height: '50px',
        background: '#eee',
        borderRadius: '25px',
        overflow: 'hidden',
        margin: '20px auto'
      }}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp} // Reset if mouse leaves slider area
    >
      <div
        ref={handleRef}
        onMouseDown={onMouseDown}
        style={{
          position: 'absolute',
          left: handleLeft,
          top: 0,
          bottom: 0,
          width: '80px',
          background: '#CFA575',
          borderRadius: '25px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        SOS
      </div>
    </div>
  );
};

const Body = () => {
  // State to show/hide the SOS confirmation card
  const [showSosCard, setShowSosCard] = useState(false);

  // Called when the slider confirms the SOS action
  const handleSosConfirm = () => {
    alert('SOS Confirmed!');
    setShowSosCard(false);
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ExperienceBar current={350} max={500} level={5} />

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => console.log('Menu clicked')}
          >
            <img
              src="/images/menu.png"
              alt="Menu"
              style={{
                position: 'relative',
                top: '25px',  // adjust vertical position here
                left: '-10px', // adjust horizontal position here
                width: '30px',
                height: '30px'
              }}
            />
          </button>
          <button
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => console.log('Person clicked')}
          >
            <img
              src="/images/person.png"
              alt="Person"
              style={{
                position: 'relative',
                top: '25px',  // adjust vertical position here
                left: '-15px', // adjust horizontal position here
                width: '30px',
                height: '30px'
              }}
            />
          </button>
        </div>
      </div>

      <div className="container center-align" style={{ marginTop: '30px' }}>
        {/* Trophy Image Above the Buttons */}
        <div style={{ marginBottom: '20px' }}>
          <img
            src={process.env.PUBLIC_URL + "/images/trophy.webp"}
            alt="Trophy"
            style={{ 
              display: 'block', 
              margin: '0 auto', 
              maxWidth: '250px',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)'
            }}
          />
        </div>

        {/* Bounty Button using CartoonyButton */}
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <CartoonyButton to="/research" color="rgb(239, 221, 121)" size="large" width="auto">
            Bounty
            <img
              src="/images/star-white.png"
              alt="Icon"
              style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                width: '20px',
                height: '20px'
              }}
            />
          </CartoonyButton>
        </div>
        
        {/* Three buttons next to each other */}
        <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <div className="col s4">
            <CartoonyButton to="/help" color="rgb(83, 211, 147)" size="large" width="100%">
              Help
              <img
                src="/images/star-white.png"
                alt="Icon"
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '20px',
                  height: '20px'
                }}
              />
            </CartoonyButton>
          </div>
          <div className="col s4">
            {/* Unused button placeholder */}
          </div>
          <div className="col s4">
            <CartoonyButton
              onClick={() => setShowSosCard(true)}
              color="rgb(83, 211, 147)"
              size="large"
              width="100%"
              height="50px"
            >
              SOS
            </CartoonyButton>
          </div>
        </div>

        {/* Conditionally render the SOS confirmation card */}
        {showSosCard && (
          <div className="card" style={{ margin: '20px auto', width: '90%', maxWidth: '400px' }}>
            <div className="card-content">
              <span className="card-title">Confirm SOS</span>
              <p>Slide the button to confirm SOS.</p>
              <SosSlider onConfirm={handleSosConfirm} />
            </div>
            <div className="card-action">
              <button className="btn red" onClick={() => setShowSosCard(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Body;
