import React, { useState, useEffect, useRef } from 'react';
import ExperienceBar from './ExperienceBar';
import CartoonyButton from './CartoonyButton';
import { Link } from 'react-router-dom';

/* ====================================================================
   Dummy Leaderboard Data and Leaderboard Component
   ==================================================================== */
const dummyLeaderboard = [
  { rank: 1, name: 'Zara', score: 3420 },
  { rank: 2, name: 'Liam', score: 2980 },
  { rank: 3, name: 'Mia', score: 2750 },
  { rank: 4, name: 'Noah', score: 2600 },
  { rank: 5, name: 'Emma', score: 2500 },
  { rank: 6, name: 'Olivia', score: 2400 },
  { rank: 7, name: 'Lucas', score: 2300 },
  { rank: 8, name: 'Ava', score: 2200 },
  { rank: 9, name: 'Ethan', score: 2100 },
  { rank: 10, name: 'Sophia', score: 2000 },
];

const Leaderboard = () => {
  return (
    <div style={{
      backgroundColor: 'rgb(83, 211, 147)',
      borderRadius: '10px',
      padding: '15px',
      width: '100%',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      fontSize: '14px'
    }}>
      <h3 style={{ color: 'white', marginBottom: '10px', fontSize: '16px' }}>Leaderboard</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '5px', color: 'white' }}>Rank</th>
            <th style={{ textAlign: 'left', padding: '5px', color: 'white' }}>Name</th>
            <th style={{ textAlign: 'right', padding: '5px', color: 'white' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {dummyLeaderboard.map((entry) => (
            <tr key={entry.rank} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ textAlign: 'left', padding: '5px', color: 'white' }}>#{entry.rank}</td>
              <td style={{ textAlign: 'left', padding: '5px', color: 'white' }}>{entry.name}</td>
              <td style={{ textAlign: 'right', padding: '5px', color: 'white' }}>{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

/* ====================================================================
   Dummy Friends Data and FriendsList Component
   ==================================================================== */
const dummyFriends = [
  { name: 'Alpha' },
  { name: 'Beta' },
  { name: 'Gamma' },
  { name: 'Delta' },
  { name: 'Epsilon' },
  { name: 'Zeta' },
  { name: 'Theta' },
  { name: 'Lambda' },
];

const FriendsList = () => {
  return (
    <div style={{
      backgroundColor: 'rgb(83, 211, 147)',
      borderRadius: '10px',
      padding: '15px',
      width: '100%',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      fontSize: '14px'
    }}>
      <h3 style={{ color: 'white', marginBottom: '10px', fontSize: '16px' }}>Friends</h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '5px', color: 'white' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '5px', color: 'white' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {dummyFriends.map((friend, index) => {
            // Top 3 are "Best Friend", the rest are "Friend"
            const status = index < 3 ? 'Best Friend' : 'Friend';
            return (
              <tr key={friend.name} style={{ borderBottom: '1px solid #ddd' }}>
                <td style={{ textAlign: 'left', padding: '5px', color: 'white' }}>
                  {friend.name}
                </td>
                <td style={{ textAlign: 'left', padding: '5px', color: 'white' }}>
                  {status}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

/* ====================================================================
   SosSlider Component – Slide from right to left to confirm SOS
   ==================================================================== */
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

  // Mouse handlers
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
      // Reset handle to right side
      if (sliderRef.current && handleRef.current) {
        const sliderWidth = sliderRef.current.offsetWidth;
        const handleWidth = handleRef.current.offsetWidth;
        setHandleLeft(sliderWidth - handleWidth);
      }
    }
  };

  // Touch handlers
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

/* ====================================================================
   DraggableCard Component – Draggable Card for SOS Confirmation
   ==================================================================== */
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
        zIndex: 1000, // ensure it appears on top
      }}
    >
      {children}
      <CartoonyButton onClick={onClose} color="rgb(239, 221, 121)" size="medium" width="auto">
        Close
      </CartoonyButton>
    </div>
  );
};

/* ====================================================================
   Body Component – Main Component Containing Application Content
   ==================================================================== */
const Body = () => {
  const [showSosCard, setShowSosCard] = useState(false);

  // NEW: For Add-Friend popup
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendUsername, setFriendUsername] = useState("");

  const handleSosConfirm = () => {
    alert('SOS Confirmed!');
    setShowSosCard(false);
  };

  // Called when the user clicks the "person.png" button
  const handlePersonClick = () => {
    setShowAddFriend(true);
  };

  // Called when the user clicks "Search" in the Add-Friend popup
  const handleSearchFriend = () => {
    alert('friend found and invite requested!');
    setShowAddFriend(false);
    setFriendUsername("");
  };

  return (
    <>
      <div
        style={{
          margin: '0 auto',
          padding: '10px',
          maxWidth: '600px',
          width: '100%'
        }}
      >
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
                  top: '25px',
                  left: '-10px',
                  width: '30px',
                  height: '30px'
                }}
              />
            </button>
            <button
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={handlePersonClick}
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

        {/* Three buttons next to each other */}
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

        <div className="container center-align" style={{ marginTop: '30px', position: 'relative' }}>
          {/* Trophy Image Above the Buttons */}
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

          {/* Centered Row for Leaderboard and FriendsList */}
          <div
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              margin: '0 auto',
              top: '380px',
              display: 'flex',
              justifyContent: 'center',
              gap: '40px',
              padding: '0 20px',
              boxSizing: 'border-box'
            }}
          >
            <div style={{ maxWidth: '300px', width: '100%' }}>
              <Leaderboard />
            </div>
            <div style={{ maxWidth: '300px', width: '100%' }}>
              <FriendsList />
            </div>
          </div>

          {/* Conditionally render the SOS confirmation card */}
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
      </div>

      {/* Conditionally render the "Add Friend" popup modal */}
      {showAddFriend && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2000
          }}
          onClick={() => setShowAddFriend(false)} // click outside to close
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              width: '300px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()} // prevent closing if clicking inside
          >
            <h2 style={{ margin: '0 0 10px' }}>Add by putting your friend's username below:</h2>
            <input
              type="text"
              placeholder="Username"
              value={friendUsername}
              onChange={(e) => setFriendUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                borderRadius: '5px',
                border: '1px solid #ccc'
              }}
            />
            <button
              onClick={handleSearchFriend}
              style={{
                backgroundColor: 'rgb(83, 211, 147)',
                color: '#fff',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '5px',
                cursor: 'pointer'
              }}
            >
              Search
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Body;
