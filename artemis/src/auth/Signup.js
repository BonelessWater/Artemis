// Signup.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import CartoonyButton from '../components/CartoonyButton';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // "normal" corresponds to Hiker, "special" corresponds to Researcher
  const [userType, setUserType] = useState('normal');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    // Create FormData since the backend expects form data
    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('user_type', userType);

    try {
      const response = await axios.post('http://localhost:5000/register', formData, {
        withCredentials: true,
      });

      if (response.status === 201) {
        setMessage('Registration successful! Please log in.');
        // Redirect to login page after successful registration
        navigate('/login');
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setMessage(err.response.data.error || err.response.data.message);
      } else {
        setMessage('Registration failed. Please try again.');
      }
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
          Sign Up
        </h1>
        {/* Spacer div for alignment */}
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
        <h2>Create Your Account</h2>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label
              style={{
                color: 'white',
                display: 'block',
                marginBottom: '5px',
                textAlign: 'center',
                fontSize: '1.2rem'
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
                fontSize: '1.2rem'
              }}
            >
              Email:
            </label>
            <input 
              type="email" 
              value={email}
              onChange={e => setEmail(e.target.value)} 
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
                fontSize: '1.2rem'
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
          <div style={{ marginBottom: '10px' }}>
            <label
              style={{
                color: 'white',
                display: 'block',
                marginBottom: '5px',
                textAlign: 'center',
                fontSize: '1.2rem'
              }}
            >
              User Type:
            </label>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
              <CartoonyButton 
                onClick={() => setUserType("normal")}
                color={userType === "normal" ? "rgb(92, 229, 206)" : "grey"}
                size="medium"
                width="auto"
              >
                Hiker
              </CartoonyButton>
              <CartoonyButton 
                onClick={() => setUserType("special")}
                color={userType === "special" ? "rgb(83, 211, 147)" : "grey"}
                size="medium"
                width="auto"
              >
                Researcher
              </CartoonyButton>
            </div>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <CartoonyButton type="submit" color="rgb(83, 211, 147)" size="large" width="auto">
              Register
            </CartoonyButton>
          </div>
        </form>
        <p style={{ marginTop: '15px' }}>
          Already have an account? <Link to="/login">Log in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
