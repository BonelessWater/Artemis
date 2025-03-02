// Login.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import CartoonyButton from '../components/CartoonyButton';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:5000/login',
        { username, password },
        { withCredentials: true }
      );

      if (response.status === 200) {
        setMessage('Login successful!');
        navigate('/'); // redirect to main page after login
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Invalid credentials or error during login.');
    }
  };

  return (
    <div>
      {/* Header */}
      <div
        className="white-header"
        style={{
          background: "white",
          width: "100%",
          padding: "16px 20px",
          position: "fixed",
          top: 0,
          left: 0,
          borderBottom: "2px solid black",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1000,
        }}
      >
        <CartoonyButton to="/" color="rgb(83, 211, 147)" size="medium" width="auto">
          Back
        </CartoonyButton>
        <h1
          style={{
            margin: 0,
            fontWeight: "bold",
            fontSize: "2.5rem",
            color: "black",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          Log In
        </h1>
        <div style={{ width: "90px" }}></div>
      </div>

      <div
        style={{
          maxWidth: '400px',
          margin: '100px auto 0',
          padding: '20px',
          backgroundColor: 'rgb(83, 211, 147)',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          textAlign: 'center',
        }}
      >
        <h2>Log In to Your Account</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label
              style={{
                color: 'white',
                display: 'block',
                marginBottom: '5px',
                textAlign: 'center',
                fontSize: '1.2rem'  // Increased font size for the label
              }}
            >
              Username:
            </label>
            <input 
              type="text" 
              value={username}
              onChange={e => setUsername(e.target.value)} 
              required
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.2)',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'center'
              }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label
              style={{
                color: 'white',
                display: 'block',
                marginBottom: '5px',
                textAlign: 'center',
                fontSize: '1.2rem'  // Increased font size for the label
              }}
            >
              Password:
            </label>
            <input 
              type="password" 
              value={password}
              onChange={e => setPassword(e.target.value)} 
              required
              style={{
                width: '100%',
                padding: '8px',
                marginTop: '5px',
                color: 'white',
                backgroundColor: 'rgba(0,0,0,0.2)',
                border: 'none',
                borderRadius: '4px',
                textAlign: 'center'
              }}
            />
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CartoonyButton type="submit" color="rgb(83, 211, 147)" size="large" width="auto">
              Log In
            </CartoonyButton>
          </div>
        </form>
        <p style={{ marginTop: '15px' }}>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
