// Body.jsx
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ExperienceBar from './ExperienceBar';
import CartoonyButton from './CartoonyButton';
import Sidebar from './Sidebar';

const SosSlider = ({ onConfirm }) => {
  const sliderRef = useRef(null);
  const handleRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [handleLeft, setHandleLeft] = useState(null);

  useEffect(() => {
    if (sliderRef.current && handleRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const handleWidth = handleRef.current.offsetWidth;
      setHandleLeft(sliderWidth - handleWidth);
    }
  }, []);

  const updatePosition = (clientX) => {
    if (sliderRef.current && handleRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const handleWidth = handleRef.current.offsetWidth;
      const dx = clientX - startX;
      setHandleLeft((prev) => {
        let newLeft = (prev !== null ? prev + dx : 0);
        if (newLeft < 0) newLeft = 0;
        if (newLeft > sliderWidth - handleWidth) newLeft = sliderWidth - handleWidth;
        return newLeft;
      });
      setStartX(clientX);
    }
  };

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
    updatePosition(e.clientX);
  };

  const onMouseUp = (e) => {
    if (!dragging) return;
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
    if (handleLeft !== null && handleLeft < 20) {
      if (onConfirm) onConfirm();
    } else {
      if (sliderRef.current && handleRef.current) {
        const sliderWidth = sliderRef.current.offsetWidth;
        const handleWidth = handleRef.current.offsetWidth;
        setHandleLeft(sliderWidth - handleWidth);
      }
    }
  };

  const onTouchStart = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setDragging(true);
    setStartX(e.touches[0].clientX);
  };

  const onTouchMove = (e) => {
    if (!dragging) return;
    e.stopPropagation();
    e.preventDefault();
    updatePosition(e.touches[0].clientX);
  };

  const onTouchEnd = (e) => {
    if (!dragging) return;
    e.stopPropagation();
    e.preventDefault();
    setDragging(false);
    if (handleLeft !== null && handleLeft < 20) {
      if (onConfirm) onConfirm();
    } else {
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
      onMouseLeave={onMouseUp}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={handleRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        style={{
          position: 'absolute',
          left: handleLeft,
          top: 0,
          bottom: 0,
          width: '80px',
          background: 'rgb(83, 211, 147)',
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

const DraggableCard = ({ children, onClose }) => {
  const cardRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (cardRef.current) {
      const cardWidth = cardRef.current.offsetWidth;
      const cardHeight = cardRef.current.offsetHeight;
      setPos({
        x: window.innerWidth / 2 - cardWidth / 2,
        y: window.innerHeight / 2 - cardHeight / 2,
      });
    }
  }, []);

  const onMouseDown = (e) => {
    setDragging(true);
    setOffset({
      x: e.clientX - pos.x,
      y: e.clientY - pos.y,
    });
  };

  const onMouseMove = (e) => {
    if (!dragging) return;
    setPos({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const onMouseUp = () => {
    setDragging(false);
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    } else {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    }
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, [dragging]);

  return (
    <div
      ref={cardRef}
      onMouseDown={onMouseDown}
      style={{
        position: 'absolute',
        left: pos.x,
        top: pos.y,
        cursor: dragging ? 'grabbing' : 'grab',
        width: '90%',
        maxWidth: '400px',
        backgroundColor: '#d4edda',
        border: '1px solid #c3e6cb',
        borderRadius: '10px',
        padding: '10px',
        zIndex: 1000,
      }}
    >
      {children}
      <CartoonyButton onClick={onClose} color="rgb(239, 221, 121)" size="medium" width="auto">
        Close
      </CartoonyButton>
    </div>
  );
};

const Body = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showSosCard, setShowSosCard] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/dashboard', { withCredentials: true })
      .then((response) => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error('Authentication check failed:', error);
        navigate('/login');
      });
  }, [navigate]);

  const handleSosConfirm = () => {
    alert('SOS Confirmed!');
    setShowSosCard(false);
  };

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {/* Overlay to close sidebar when clicked */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.3)',
            zIndex: 1500,
          }}
        ></div>
      )}

      {/* Render the sidebar if open */}
      {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <ExperienceBar current={350} max={500} level={5} />
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button
            style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
            onClick={() => setSidebarOpen(true)}
          >
            <img
              src="/images/menu.png"
              alt="Menu"
              style={{
                position: 'relative',
                top: '25px',
                left: '-10px',
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
                top: '25px',
                left: '-15px',
                width: '30px',
                height: '30px'
              }}
            />
          </button>
        </div>
      </div>

      <div className="row" style={{ marginTop: '35px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <div className="col s4">
          <CartoonyButton to="/prep" color="rgb(83, 211, 147)" size="large" width="100%">
            Prep
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
          <CartoonyButton
            onClick={() => setShowSosCard(true)}
            color="rgb(83, 211, 147)"
            size="large"
            width="100%"
          >
            SOS
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
      </div>

      <div className="container center-align" style={{ marginTop: '30px' }}>
        <div style={{ marginBottom: '20px' }}>
          <Link to="/achieve">
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
          </Link>
        </div>

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
      
        {showSosCard && (
          <DraggableCard onClose={() => setShowSosCard(false)}>
            <div className="card-content">
              <span className="card-title" style={{ color: '#155724', fontWeight: 'bold' }}>
                911
              </span>
              <p style={{ color: '#155724' }}>Slide the button to call 911.</p>
              <SosSlider onConfirm={handleSosConfirm} />
            </div>
          </DraggableCard>
        )}
      </div>
    </>
  );
};

export default Body;
