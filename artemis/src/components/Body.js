// src/Body.js
import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const Body = () => {
  // Style object for the buttons
  const buttonStyle = {
    width: '80%',
    margin: '10px 0',
    backgroundColor: '#83CC6D'
  };

  return (
    <div className="container center-align" style={{ marginTop: '30px' }}>
      <div 
        className="row" 
        style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <div className="col s12">
          {/* Use Link to navigate to the research page */}
          <Link to="/research" className="btn-large" style={buttonStyle}>
            Research
          </Link>
        </div>
        <div className="col s12">
          <button className="btn-large" style={buttonStyle}>
            Question Answering
          </button>
        </div>
        <div className="col s12">
          <button className="btn-large" style={buttonStyle}>
            FAQ
          </button>
        </div>
      </div>
    </div>
  );
};

export default Body;
