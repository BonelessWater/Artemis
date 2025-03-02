import React, { useState } from "react";

const DiscussionForum = () => {
  // Define an array of random usernames to use
  const randomUsernames = [
    "MountainHiker", "UrbanSurvivalist", "WildernessPro", 
    "PrepperNinja", "ReadyAlways", "StormRider", 
    "BugOutExpert", "EmergencyGuru", "OffGridLiving", 
    "SurviveAndThrive", "GearCollector", "CampingPro",
    "ForageKing", "PrepQueen", "ShelterBuilder",
    "WaterWise", "SelfSufficient", "BackwoodsExplorer"
  ];
  
  // Function to get a random username
  const getRandomUsername = () => {
    return randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
  };

  // Function to truncate text with ellipsis
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  const [posts, setPosts] = useState([
    { 
      id: 1, 
      title: "How to start prepping?", 
      description: "Tips for beginners on emergency preparedness.", 
      image: "/images/question.png", 
      comments: [
        { user: getRandomUsername(), text: "Start with water storage!" }, 
        { user: getRandomUsername(), text: "Buy a first aid kit." }
      ] 
    },
    { 
      id: 2, 
      title: "Best survival gear recommendations?", 
      description: "A discussion on must-have survival tools.", 
      image: "/images/pickaxe.png", 
      comments: [
        { user: getRandomUsername(), text: "Fire starter is a must!" }, 
        { user: getRandomUsername(), text: "Get a multi-tool." }
      ] 
    },
    { 
      id: 3, 
      title: "Water purification techniques?", 
      description: "Effective ways to ensure clean drinking water.", 
      image: "/images/water.png", 
      comments: [
        { user: getRandomUsername(), text: "Boiling is the safest." }, 
        { user: getRandomUsername(), text: "Use a water filter." }
      ] 
    }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [image, setImage] = useState(null);
  const [tempComments, setTempComments] = useState([]);

  const handlePostClick = (post) => {
    setSelectedPost(post);
    setTempComments(post.comments); // Preserve original comments
  };

  const closePopup = () => {
    setSelectedPost(null);
    setNewComment("");
    setImage(null);
    setTempComments([]); // Reset temp comments when closing
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "" || image) {
      // Use a random username for new comments
      const newCommentObj = { user: getRandomUsername(), text: newComment, image };
      setTempComments([...tempComments, newCommentObj]);
      setNewComment("");
      setImage(null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Define dark grey color
  const darkGrey = "#444444";

  return (
    <div className="min-height-100vh" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: "80px", width: "100%", maxWidth: "100vw" }}>
      {/* Header section */}
      <div className="white center-align z-depth-1" style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "16px", borderBottom: "2px solid black", background: "white", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
        <button onClick={() => window.location.href = "http://localhost:3000/"} style={{ background: "black", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px", fontSize: "1rem", flexShrink: 0 }}>
          Back
        </button>
        <h1 className="black-text" style={{ fontWeight: "bold", fontSize: "2.5rem", textAlign: "center", flexGrow: 1, minWidth: "200px" }}>F&Q</h1>
      </div>

      {/* Discussion Forum Posts */}
      <div style={{ width: "90%", maxWidth: "800px", marginTop: "100px", display: "flex", flexDirection: "column", alignItems: "center" }}>
        {posts.map(post => (
          <button key={post.id} onClick={() => handlePostClick(post)} 
            style={{ 
              background: "white", 
              padding: "20px", 
              marginBottom: "10px", 
              borderRadius: "10px", 
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", 
              textAlign: "left", 
              border: "1px solid #ccc", 
              cursor: "pointer", 
              width: "100%", 
              display: "flex", 
              alignItems: "center", 
              justifyContent: "space-between",
              position: "relative",
              minHeight: "120px"
            }}>
            <div style={{ 
              flex: "1", 
              minWidth: "0", 
              paddingRight: "80px" // Make space for the image
            }}>
              <h2 style={{ 
                fontSize: "1.8rem", 
                fontWeight: "bold", 
                marginBottom: "8px", 
                color: "rgba(0, 0, 0, 1)", 
                whiteSpace: "nowrap", 
                overflow: "hidden", 
                textOverflow: "ellipsis", 
                maxWidth: "100%"
              }}>
                {truncateText(post.title, 30)}
              </h2>
              <p style={{ fontSize: "1rem", fontWeight: "bold", color: "rgba(0, 0, 0, 1)", marginBottom: "5px" }}>Description:</p>
              <p style={{ 
                fontSize: "1rem", 
                color: "rgba(0, 0, 0, 1)", 
                marginBottom: "10px",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical"
              }}>
                {truncateText(post.description, 80)}
              </p>
            </div>
            <div style={{ 
              position: "absolute", 
              right: "20px", 
              top: "50%", 
              transform: "translateY(-50%)", 
              width: "70px", 
              height: "70px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <img src={post.image} alt="Post Image" style={{ maxWidth: "100%", maxHeight: "100%" }} />
            </div>
          </button>
        ))}
      </div>

      {/* Full Page Popup Window */}
      {selectedPost && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "white", color: darkGrey, padding: "20px", textAlign: "left", zIndex: 20, overflowY: "auto" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: "10px", color: darkGrey }}>{selectedPost.title}</h2>
          <p style={{ fontSize: "1.2rem", fontWeight: "bold", marginBottom: "5px", color: darkGrey }}>Description:</p>
          <p style={{ fontSize: "1.2rem", marginBottom: "10px", color: darkGrey }}>{selectedPost.description}</p>

          {/* Comments Section */}
          <div style={{ marginTop: "20px" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: darkGrey }}>Comments:</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {tempComments.map((comment, index) => (
                <li key={index} style={{ 
                  marginBottom: "15px", 
                  color: darkGrey,
                  padding: "10px",
                  borderLeft: "3px solid #888",
                  backgroundColor: "#f8f8f8"
                }}>
                  <div style={{ 
                    fontSize: "1.1rem", 
                    color: darkGrey, 
                    fontWeight: "bold",
                    marginBottom: "5px"
                  }}>
                    {comment.user}:
                  </div>
                  <div style={{ fontSize: "1rem", color: darkGrey }}>{comment.text}</div>
                  {comment.image && <img src={comment.image} alt="User Upload" style={{ display: "block", maxWidth: "100px", marginTop: "5px" }} />}
                </li>
              ))}
            </ul>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={{ width: "100%", padding: "10px", marginTop: "10px", color: darkGrey, background: "white", border: "1px solid #888" }}
            ></textarea>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: "10px", color: darkGrey }} />
            <button onClick={handleAddComment} style={{ marginTop: "10px", background: "black", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "3px" }}>Post Comment</button>
          </div>

          <button onClick={closePopup} style={{ marginTop: "20px", background: "black", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;