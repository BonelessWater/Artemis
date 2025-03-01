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
          {/* Centered logo using Artemis logo from the public folder */}
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
      </ul>
    </>
  );
};

export default Header;
