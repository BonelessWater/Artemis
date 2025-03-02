import React, { useState } from "react";

const Achievements = () => {
  const [selectedAchievement, setSelectedAchievement] = useState(null);

  const handleClick = (achievement, description) => {
    setSelectedAchievement({ name: achievement, description });
  };

  const handleClose = () => {
    setSelectedAchievement(null);
  };

  return (
    <div className="min-height-100vh" style={{ background: "none", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      {/* Header section with proper styling */}
      <div className="white center-align z-depth-1" style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "16px", borderBottom: "2px solid black" }}>
        <h1 className="black-text" style={{ fontWeight: "bold", fontSize: "2.5rem" }}>Achievements</h1>
      </div>
      
      {/* Achievement images in a binary search tree (BST) layout */}
      <div style={{ marginTop: "200px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {/* Root Node */}
        <button onClick={() => handleClick("Tree", "Planted a tree and helped the environment!")} style={{ background: "url('/images/oak-wood-texture.png')", backgroundSize: "cover", padding: "15px", borderRadius: "10px", border: "3px solid #8B5A2B", cursor: "pointer" }}>
          <img src="/images/tree.png" alt="Tree Achievement" style={{ width: "80px", height: "80px" }} />
        </button>
        
        {/* Level 1 */}
        <div style={{ display: "flex", justifyContent: "center", gap: "150px", marginTop: "40px" }}>
          <button onClick={() => handleClick("Fire", "Started a campfire successfully!")} style={{ background: "url('/images/oak-wood-texture.png')", backgroundSize: "cover", padding: "15px", borderRadius: "10px", border: "3px solid #8B5A2B", cursor: "pointer" }}>
            <img src="/images/fire.png" alt="Fire Achievement" style={{ width: "80px", height: "80px" }} />
          </button>
          <button onClick={() => handleClick("Fish", "Caught a fish in the wild!")} style={{ background: "url('/images/oak-wood-texture.png')", backgroundSize: "cover", padding: "15px", borderRadius: "10px", border: "3px solid #8B5A2B", cursor: "pointer" }}>
            <img src="/images/fish.png" alt="Fish Achievement" style={{ width: "80px", height: "80px" }} />
          </button>
        </div>
        
        {/* Level 2 */}
        <div style={{ display: "flex", justifyContent: "center", gap: "300px", marginTop: "40px" }}>
          <button onClick={() => handleClick("Shit", "An unexpected encounter with nature!")} style={{ background: "url('/images/oak-wood-texture.png')", backgroundSize: "cover", padding: "15px", borderRadius: "10px", border: "3px solid #8B5A2B", cursor: "pointer" }}>
            <img src="/images/shit.png" alt="Shit Achievement" style={{ width: "80px", height: "80px" }} />
          </button>
          <button onClick={() => handleClick("Water", "Found a clean water source!")} style={{ background: "url('/images/oak-wood-texture.png')", backgroundSize: "cover", padding: "15px", borderRadius: "10px", border: "3px solid #8B5A2B", cursor: "pointer" }}>
            <img src="/images/water.png" alt="Water Achievement" style={{ width: "80px", height: "80px" }} />
          </button>
        </div>
      </div>
      
      {/* Popup notification */}
      {selectedAchievement && (
        <div style={{ position: "fixed", bottom: "20px", left: "50%", transform: "translateX(-50%)", background: "black", color: "white", padding: "10px 20px", borderRadius: "5px", textAlign: "center", boxShadow: "0px 0px 10px rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <strong style={{ fontSize: "1.5rem" }}>{selectedAchievement.name}</strong>
          <p style={{ margin: "5px 0 0", fontSize: "12px" }}>{selectedAchievement.description}</p>
          <button onClick={handleClose} style={{ marginTop: "10px", background: "white", color: "black", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "3px" }}>Close</button>
        </div>
      )}

      {/* OK Button to return to Home */}
      <button onClick={() => window.location.href = "http://localhost:3000/"} style={{ marginTop: "20px", background: "blue", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>OK</button>
    </div>
  );
};

export default Achievements;
