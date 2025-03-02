import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import ExperienceBar from '../components/ExperienceBar';
import CartoonyButton from '../components/CartoonyButton';
import Sidebar from '../components/Sidebar';
import DraggableCard from '../components/DraggableCard';

/* ====================================================================
   Dummy Leaderboard Data and Leaderboard Component
   ==================================================================== */

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('/api/leaderboard');
        const data = await response.json();
        setLeaderboard(data);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
      }
    };
    fetchLeaderboard();
  }, [])

  return (
    <div style={{
      backgroundColor: 'rgb(83, 211, 147)',
      borderRadius: '10px',
      padding: '15px',
      width: '100%',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      fontSize: '14px'
    }}>
      <h3 style={{ 
        color: 'white', 
        marginTop: '0px',
        marginBottom: '10px', 
        fontSize: '24px', 
        textAlign: 'center' 
      }}>
        Leaderboard
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '5px', color: 'white' }}>Rank</th>
            <th style={{ textAlign: 'left', padding: '5px', color: 'white' }}>Name</th>
            <th style={{ textAlign: 'right', padding: '5px', color: 'white' }}>Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry) => (
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

const FriendsList = () => {
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/friends', { withCredentials: true })
      .then(response => {
        setFriends(response.data);
      })
      .catch(error => {
        console.error("Error fetching friends:", error);
      });
  }, []);

  return (
    <div style={{
      backgroundColor: 'rgb(83, 211, 147)',
      borderRadius: '10px',
      padding: '15px',
      width: '100%',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)',
      fontSize: '14px'
    }}>
      <h3 style={{ 
        color: 'white', 
        marginTop: '0px',
        marginBottom: '10px', 
        fontSize: '24px', 
        textAlign: 'center' 
      }}>
        Friends
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ borderBottom: '2px solid #ddd' }}>
            <th style={{ textAlign: 'left', padding: '5px', color: 'white' }}>Name</th>
            <th style={{ textAlign: 'left', padding: '5px', color: 'white' }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend, index) => {
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
            )
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
    // If the handle is near the left edge, confirm
    if (handleLeft !== null && handleLeft < 20) {
      if (onConfirm) onConfirm();
    } else {
      // Otherwise reset to right
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
   Body Component – Main Component Containing Application Content
   ==================================================================== */
const Body = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const [showSosCard, setShowSosCard] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // For Add-Friend popup
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friendUsername, setFriendUsername] = useState("");

  // Check authentication on mount
  useEffect(() => {
    axios
      .get('http://localhost:5000/dashboard', { withCredentials: true })
      .then(() => {
        setIsAuthenticated(true);
      })
      .catch((error) => {
        console.error('Authentication check failed:', error);
        navigate('/login');
      });
  }, [navigate]);

  // If not authenticated, show loading or redirect
  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Called when the slider confirms the SOS action
  const handleSosConfirm = () => {
    alert('SOS Confirmed!');
    setShowSosCard(false);
  };

  // Person icon click -> open "Add Friend" popup
  const handlePersonClick = () => {
    setShowAddFriend(true);
  };

  // Searching for friend
  const handleSearchFriend = () => {
    alert('friend found and invite requested!');
    setShowAddFriend(false);
    setFriendUsername("");
  };

  return (
    <>
      {/* If sidebarOpen is true, show an overlay to close sidebar */}
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
            zIndex: 1500
          }}
        />
      )}
      {/* Render Sidebar if open */}
      {sidebarOpen && <Sidebar onClose={() => setSidebarOpen(false)} />}

      {/* Main Container */}
      <div
        style={{
          margin: '0 auto',
          padding: '10px',
          maxWidth: '600px',
          width: '100%'
        }}
      >
        {/* Top Bar: Experience & Icons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <ExperienceBar current={350} max={500} level={5} />
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <button
              style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
              onClick={() => setSidebarOpen(true)}
            >
              <img
                src="/images/menu/menu.png"
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
                src="/images/menu/person.png"
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

        {/* Row of 3 Buttons: Prep, Help, SOS */}
        <div
          className="row"
          style={{
            marginTop: '35px',
            display: 'flex',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <div className="col s4">
            <CartoonyButton to="/prep" color="rgb(83, 211, 147)" size="large" width="100%">
              Prep
              <img
                src="/images/menu/star-white.png"
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
                src="/images/menu/star-white.png"
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
                src="/images/menu/star-white.png"
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

        {/* Trophy, Bounty, Leaderboard & Friends */}
        <div className="container center-align" style={{ marginTop: '30px', position: 'relative' }}>
          {/* Trophy */}
          <div style={{ marginBottom: '20px' }}>
            <Link to="/achieve">
              <img
                src={process.env.PUBLIC_URL + "/images/menu/trophy.webp"}
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

          {/* Bounty Button */}
          <div style={{ marginBottom: '20px', textAlign: 'center' }}>
            <CartoonyButton
              to="/research"
              color="rgb(239, 221, 121)"
              size="large"
              width="50%"
              movement={true}  // This is optional since movement defaults to true
            >
              Bounty
              <img
                src="/images/menu/star-white.png"
                alt="Icon"
                style={{
                  position: 'absolute',
                  top: '-3px',
                  right: '-3px',
                  width: '20px',
                  height: '20px',
                }}
              />
            </CartoonyButton>
          </div>

          {/* Centered Row for Leaderboard & Friends */}
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

          {/* SOS Confirmation Card */}
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
          onClick={() => setShowAddFriend(false)}
        >
          <div
            style={{
              backgroundColor: '#fff',
              padding: '20px',
              borderRadius: '10px',
              width: '300px',
              position: 'relative'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ margin: '0 0 10px' }}>Add a Friend</h2>
            <p style={{ marginBottom: '10px', fontSize: '14px', color: '#333' }}>
              Enter your friend's username below to send a friend request.
            </p>
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
