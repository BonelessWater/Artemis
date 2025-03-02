// src/Body.js
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

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
    <div className="container center-align" style={{ marginTop: '30px' }}>
      {/* Three buttons next to each other */}
      <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <div className="col s4">
          <button className="btn-large" style={{ backgroundColor: '#83CC6D', width: '100%' }}>
            Help
          </button>
        </div>
        <div className="col s4">
          <button className="btn-large" style={{ backgroundColor: '#83CC6D', width: '100%' }}>
            Prep
          </button>
        </div>
        <div className="col s4">
          <button
            className="btn-large"
            style={{ backgroundColor: '#83CC6D', width: '100%' }}
            onClick={() => setShowSosCard(true)}
          >
            SOS
          </button>
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
  );
};

export default Body;
