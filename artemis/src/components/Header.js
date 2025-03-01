// src/Header.js
import React, { useEffect } from 'react';
import M from 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';

const Header = () => {
  useEffect(() => {
    // Initialize the sidenav for the dropdown sidebar
    const elems = document.querySelectorAll('.sidenav');
    M.Sidenav.init(elems, {});
  }, []);

  return (
    <>
      <nav>
        <div 
          className="nav-wrapper" 
          style={{ backgroundColor: '#CFA575', height: '70px' }}
        >
          {/* Hamburger icon on the left */}
          <a
            href="#!"
            data-target="mobile-menu"
            className="sidenav-trigger left"
            style={{ paddingLeft: '0px' }}
          >
            <i 
              className="material-icons" 
              style={{ color: '#ffffff', fontSize: '32px', padding: '10px' }}
            >
              menu
            </i>
          </a>
          {/* Centered logo */}
          <a href="#!" className="brand-logo center">
            <img
              src={`${process.env.PUBLIC_URL}/artemis_logo-transparent-white.png`}
              alt="Artemis Logo"
              style={{ height: '85px', width: 'auto' }}
            />
          </a>
          {/* Profile icon on the right */}
          <ul className="right">
            <li>
              <a href="#!">
                <i 
                  className="material-icons" 
                  style={{ color: '#ffffff', fontSize: '32px', paddingRight: '25px', padding: '10px' }}
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
        <li><a href="#!">Home</a></li>
        <li><a href="#!">Settings</a></li>
        <li><a href="#!">Help</a></li>
        {/* SOS Button with sliding animation */}
        <li>
          <button 
            className="btn sos-btn" 
            style={{ width: '100%', marginTop: '20px' }}
          >
            SOS
          </button>
        </li>
      </ul>

      {/* Inline CSS for the sliding animation */}
      <style>
        {`
          @keyframes slideIn {
            from { transform: translateX(-100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
          }
          .sos-btn {
            animation: slideIn 0.5s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default Header;
