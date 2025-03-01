// src/Header.js
import React, { useEffect, useRef, useState } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

// SosSlider Component – Slide from right to left to activate SOS mode
const SosSlider = ({ onActivate }) => {
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
      // Update handle position; constrain within [0, sliderWidth - handleWidth]
      setHandleLeft((prev) => {
        let newLeft = (prev !== null ? prev + dx : 0);
        if (newLeft < 0) newLeft = 0;
        if (newLeft > sliderWidth - handleWidth)
          newLeft = sliderWidth - handleWidth;
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
    // If the handle has been dragged far enough left (threshold: <20px), trigger SOS
    if (handleLeft !== null && handleLeft < 20) {
      if (onActivate) onActivate();
    } else {
      // Otherwise, reset the handle to the right side
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
      onMouseLeave={onMouseUp} // Reset handle if mouse leaves the slider area
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

const Header = () => {
  useEffect(() => {
    // Initialize Materialize CSS sidenav
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }, []);

  const handleSosActivate = () => {
    // Replace with your actual SOS activation logic
    alert('SOS Activated');
  };

  return (
    <>
      <nav>
        <div
          className="nav-wrapper"
          style={{ backgroundColor: 'rgb(29, 103, 19)', height: '70px' }}
        >
          {/* Hamburger Icon */}
          <a
            href="#!"
            data-target="mobile-menu"
            className="sidenav-trigger left"
            style={{ paddingLeft: '0px' }}
          >
            <i
              className="material-icons"
              style={{
                color: '#ffffff',
                fontSize: '32px',
                padding: '10px'
              }}
            >
              menu
            </i>
          </a>
          {/* Centered Logo */}
          <a href="#!" className="brand-logo center">
            <img
              src={`${process.env.PUBLIC_URL}/artemis_logo-transparent-white.png`}
              alt="Artemis Logo"
              style={{ height: '85px', width: 'auto' }}
            />
          </a>
          {/* Profile Icon */}
          <ul className="right">
            <li>
              <a href="#!">
                <i
                  className="material-icons"
                  style={{
                    color: '#ffffff',
                    fontSize: '32px',
                    paddingRight: '25px',
                    padding: '10px'
                  }}
                >
                  person
                </i>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sidenav for the dropdown sidebar */}
      <ul className="sidenav" id="mobile-menu">
        <li>
          <a href="#!">Home</a>
        </li>
        <li>
          <a href="#!">Settings</a>
        </li>
        <li>
          <a href="#!">Help</a>
        </li>
        <li>
          {/* Replace the plain SOS button with the slider */}
          <SosSlider onActivate={handleSosActivate} />
        </li>
      </ul>
    </>
  );
};

export default Header;
