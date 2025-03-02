// Login.js
import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Adjust the URL if your backend runs on a different host/port
      const response = await axios.post(
        'http://localhost:5000/login',
        { username, password },
        { withCredentials: true }  // Important to include cookies
      );

      if (response.status === 200) {
        setMessage('Login successful!');
        // You can also store user info in local storage or context if needed
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Invalid credentials or error during login.');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input 
            type="text" 
            value={username} 
            onChange={e => setUsername(e.target.value)} 
            required 
          />
        </label>
        <br />
        <label>
          Password:
          <input 
            type="password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
        </label>
        <br />
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
