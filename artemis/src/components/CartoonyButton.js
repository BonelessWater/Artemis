import React from 'react';
import { Link } from 'react-router-dom';

const CartoonyButton = ({
  to,
  onClick,
  children,
  color = '#007BFF',
  size = 'medium', // default size
  height, // new prop for height
  width,  // new prop for width
  movement = true, // new prop for movement; defaults to true
  style: customStyle = {},
  ...rest
}) => {
  // Map size prop to CSS values
  const sizeStyles = {
    small: {
      padding: '5px 10px',
      fontSize: '14px',
    },
    medium: {
      padding: '10px 20px',
      fontSize: '18px',
    },
    large: {
      padding: '15px 30px',
      fontSize: '22px',
    },
    large2: {
      padding: '25px 40px',
      fontSize: '40px',
    },
  }[size] || {};

  // Merge color, size, explicit dimensions and any additional custom styles
  const buttonStyle = {
    '--button-color': color,
    ...sizeStyles,
    ...(height ? { height } : {}),
    ...(width ? { width } : {}),
    ...customStyle,
  };

  // If movement is enabled, add a pulse animation with a rest period
  const movementStyle = movement ? { animation: "pulse 4s infinite" } : {};

  // Clone children to apply spin animation on any img element if movement is true
  const enhancedChildren = React.Children.map(children, child => {
    if (React.isValidElement(child) && child.type === 'img') {
      return React.cloneElement(child, {
        style: {
          ...child.props.style,
          animation: movement ? "starSpin 4s infinite" : "none",
        },
      });
    }
    return child;
  });

  return (
    <>
      <style>{`
        .cartoony-btn {
          position: relative;
          overflow: hidden;
          background-color: var(--button-color, #007BFF);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.5);
          border-radius: 4px;
          cursor: pointer;
          transition: background-color 0.3s ease;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
        }
        .cartoony-btn::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 0;
          height: 200%;
          background: rgba(255, 255, 255, 0.8);
          transform: rotate(45deg);
          pointer-events: none;
          animation-fill-mode: forwards;
        }
        .cartoony-btn:hover::before {
          animation: sweepShine 1s ease forwards;
        }
        @keyframes sweepShine {
          0% { width: 0; }
          50% { width: 200%; }
          100% { width: 0; }
        }
        .shine-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
        }
        .shine-line {
          position: absolute;
          top: 30%;
          width: 80px;
          height: 2px;
          background: rgba(255, 255, 255, 0.9);
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .cartoony-btn:hover .shine-lines .shine-line:nth-child(1) {
          animation: shineLine 1s ease forwards;
        }
        .cartoony-btn:hover .shine-lines .shine-line:nth-child(2) {
          top: 60%;
          animation: shineLine 1s ease forwards 0.2s;
        }
        @keyframes shineLine {
          0% { left: -100%; opacity: 0; }
          10% { opacity: 1; }
          50% { left: 50%; opacity: 1; }
          100% { left: 100%; opacity: 0; }
        }
        .glare-rect {
          position: absolute;
          right: 0;
          top: 0;
          width: 30%;
          height: 100%;
          background: rgba(255, 255, 255, 0.8);
          transform: skewX(-20deg);
          pointer-events: none;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .cartoony-btn:hover .glare-rect {
          animation: glareRect 1s ease forwards;
        }
        @keyframes glareRect {
          0% {
            opacity: 1;
            transform: translateX(0) skewX(-20deg);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) skewX(-20deg);
          }
          100% {
            opacity: 0;
            transform: translateX(-100%) skewX(-20deg);
          }
        }
        /* Pulse animation with a rest period */
        @keyframes pulse {
          0% { transform: scale(1); }
          25% { transform: scale(1.1); }
          50% { transform: scale(1); }
          100% { transform: scale(1); }
        }
        /* Star spin animation that spins only during the growth phase (0% to 25%) */
        @keyframes starSpin {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(360deg); }
          26% { transform: rotate(360deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      {to ? (
        <Link to={to} style={{ textDecoration: 'none' }}>
          <button
            className="cartoony-btn"
            onClick={onClick}
            {...rest}
            style={{ ...buttonStyle, ...movementStyle }}
          >
            {enhancedChildren}
            <div className="shine-lines">
              <div className="shine-line"></div>
              <div className="shine-line"></div>
            </div>
            <div className="glare-rect"></div>
          </button>
        </Link>
      ) : (
        <button
          className="cartoony-btn"
          onClick={onClick}
          {...rest}
          style={{ ...buttonStyle, ...movementStyle }}
        >
          {enhancedChildren}
          <div className="shine-lines">
            <div className="shine-line"></div>
            <div className="shine-line"></div>
          </div>
          <div className="glare-rect"></div>
        </button>
      )}
    </>
  );
};

export default CartoonyButton;
