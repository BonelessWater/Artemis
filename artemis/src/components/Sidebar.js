import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CartoonyButton from '../components/CartoonyButton';
import 'materialize-css/dist/css/materialize.min.css'; // Ensure Materialize CSS is imported

const Sidebar = ({ onClose }) => {
  const sidebarRef = useRef(null);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef(0);
  const [tracking, setTracking] = useState(false); // State for the switch

  const handleMouseDown = (e) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startXRef.current;
    if (dx < 0) {
      setDragX(dx);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX < -100) {
      onClose();
    } else {
      setDragX(0);
    }
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const dx = e.touches[0].clientX - startXRef.current;
    if (dx < 0) {
      setDragX(dx);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragX < -100) {
      onClose();
    } else {
      setDragX(0);
    }
  };

  return (
    <div
      ref={sidebarRef}
      style={{
        position: 'fixed',
        top: 0,
        left: dragX,
        width: '250px',
        height: '100%',
        backgroundColor: 'white',
        boxShadow: '4px 0 10px rgba(0, 0, 0, 0.4)', // Updated shadow
        zIndex: 2000,
        padding: '20px',
        transition: isDragging ? 'none' : 'left 0.3s ease-out',
        color: 'rgb(83, 211, 147)',
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <CartoonyButton
        onClick={onClose}
        color="rgb(83, 211, 147)"
        size="medium"
        width="auto"
      >
        Close
      </CartoonyButton>
      <ul style={{ listStyle: 'none', padding: '20px 0', margin: 0 }}>
        <li style={{ marginBottom: '10px', color: 'rgb(83, 211, 147)' }}>
          Current ArtemisPoints: 1234
        </li>
        <li style={{ marginBottom: '10px', color: 'rgb(83, 211, 147)' }}>
          Lifetime ArtemisPoints: 5678
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/news" onClick={onClose} style={{ color: 'rgb(83, 211, 147)' }}>
            News
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/explore" onClick={onClose} style={{ color: 'rgb(83, 211, 147)' }}>
            Explore
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/rate-us" onClick={onClose} style={{ color: 'rgb(83, 211, 147)' }}>
            Rate Us
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/settings" onClick={onClose} style={{ color: 'rgb(83, 211, 147)' }}>
            Settings
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/help" onClick={onClose} style={{ color: 'rgb(83, 211, 147)' }}>
            Help
          </Link>
        </li>
        <li style={{ marginBottom: '10px' }}>
          <Link to="/feedback" onClick={onClose} style={{ color: 'rgb(83, 211, 147)' }}>
            Feedback
          </Link>
        </li>
        {/* Track Location switch at the bottom */}
        <li style={{ marginTop: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgb(83, 211, 147)' }}>Track Location</span>
          <div className="switch">
            <label>
              Off
              <input 
                type="checkbox" 
                checked={tracking} 
                onChange={() => setTracking(!tracking)} 
              />
              <span className="lever"></span>
              On
            </label>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
