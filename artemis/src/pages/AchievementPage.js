import React, { useState } from "react";
import CartoonyButton from "../components/CartoonyButton";

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleClick = (achievement, description) => {
    setSelectedAchievement({ name: achievement, description });
  };

  const handleClose = () => {
    setSelectedAchievement(null);
  };

  return (
    <div
      className="min-height-100vh"
      style={{
        background: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {/* Fixed White Header */}
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
          Achievements
        </h1>
        {/* Spacer div for alignment */}
        <div style={{ width: "90px" }}></div>
      </div>

      {/* Main content pushed down so it doesn't hide behind the fixed header */}
      <div
        style={{
          marginTop: "120px", // adjust as needed based on header height
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Root Node */}
        <button
          onClick={() =>
            handleClick("Tree", "Planted a tree and helped the environment!")
          }
          style={{
            background: "url('/images/oak-wood-texture.png')",
            backgroundSize: "cover",
            padding: "15px",
            borderRadius: "10px",
            border: "3px solid #8B5A2B",
            cursor: "pointer",
          }}
        >
          <img
            src="/images/tree.png"
            alt="Tree Achievement"
            style={{
              width: "80px",
              height: "80px",
              transform: "scale(1)",
              transformOrigin: "center"
            }}
          />
        </button>


        {/* Arrow between Root and Level 1 */}
        <div style={{ marginTop: "40px", textAlign: "center" }}>
          <img
            src="/images/arrow_down.png"
            alt="Arrow"
            style={{ width: "50px", height: "auto" }}
          />
        </div>

        {/* Level 1 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "150px",
            marginTop: "40px",
          }}
        >
          <button
            onClick={() =>
              handleClick("Fire", "Started a campfire successfully!")
            }
            style={{
              background: "url('/images/oak-wood-texture.png')",
              backgroundSize: "cover",
              padding: "15px",
              borderRadius: "10px",
              border: "3px solid #8B5A2B",
              cursor: "pointer",
            }}
          >
            <img
              src="/images/fire.png"
              alt="Fire Achievement"
              style={{ 
                width: "80px", 
                height: "80px", 
                transform: "scale(1.5)",
                transformOrigin: "center"
              }}
            />
          </button>
          <button
            onClick={() => handleClick("Fish", "Caught a fish in the wild!")}
            style={{
              background: "url('/images/oak-wood-texture.png')",
              backgroundSize: "cover",
              padding: "15px",
              borderRadius: "10px",
              border: "3px solid #8B5A2B",
              cursor: "pointer",
            }}
          >
            <img
              src="/images/fish.png"
              alt="Fish Achievement"
              style={{ 
                width: "80px", 
                height: "80px",
                transform: "scale(1.1)",
                transformOrigin: "center"
               }}
            />
          </button>
        </div>

        {/* Arrow between Level 1 and Level 2 */}
        <div style={{ marginTop: "60px", textAlign: "center" }}>
          <img
            src="/images/arrow_down.png"
            alt="Arrow"
            style={{ width: "50px", height: "auto" }}
          />
        </div>

        {/* Level 2 */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "150px",
            marginTop: "40px",
          }}
        >
          <button
            onClick={() =>
              handleClick("Shit", "An unexpected encounter with nature!")
            }
            style={{
              background: "url('/images/oak-wood-texture.png')",
              backgroundSize: "cover",
              padding: "15px",
              borderRadius: "10px",
              border: "3px solid #8B5A2B",
              cursor: "pointer",
            }}
          >
            <img
              src="/images/shit.png"
              alt="Shit Achievement"
              style={{ 
                width: "80px", 
                height: "80px",
                transform: "scale(1)",
                transformOrigin: "center"
               }}
            />
          </button>
          <button
            onClick={() =>
              handleClick("Water", "Found a clean water source!")
            }
            style={{
              background: "url('/images/oak-wood-texture.png')",
              backgroundSize: "cover",
              padding: "15px",
              borderRadius: "10px",
              border: "3px solid #8B5A2B",
              cursor: "pointer",
            }}
          >
            <img
              src="/images/water.png"
              alt="Water Achievement"
              style={{ 
                width: "80px", 
                height: "80px",
                transform: "scale(1.5)",
                transformOrigin: "center"
               }}
            />
          </button>
        </div>
      </div>

      {/* Popup notification */}
      {selectedAchievement && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "black",
            color: "white",
            padding: "10px 20px",
            borderRadius: "5px",
            textAlign: "center",
            boxShadow: "0px 0px 10px rgba(0,0,0,0.5)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <strong style={{ fontSize: "1.5rem" }}>
            {selectedAchievement.name}
          </strong>
          <p style={{ margin: "5px 0 0", fontSize: "12px" }}>
            {selectedAchievement.description}
          </p>
          <button
            onClick={handleClose}
            style={{
              marginTop: "10px",
              background: "white",
              color: "black",
              border: "none",
              padding: "5px 10px",
              cursor: "pointer",
              borderRadius: "3px",
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* OK Button to return to Home */}
      <div style={{ marginTop: "20px" }}>
        <CartoonyButton to="/" color="rgb(224, 87, 87)" size="medium" width="auto">
          OK
        </CartoonyButton>
      </div>
    </div>
  );
};

export default Achievements;
