import React, { useState } from "react";

const DiscussionForum = () => {
  const [posts, setPosts] = useState([
    { id: 1, title: "How to start prepping?", description: "Tips for beginners on emergency preparedness.", comments: [{ user: "yungthickdaddy", text: "Start with water storage!" }, { user: "survivalKing", text: "Buy a first aid kit." }] },
    { id: 2, title: "Best survival gear recommendations?", description: "A discussion on must-have survival tools.", comments: [{ user: "prepMaster", text: "Fire starter is a must!" }, { user: "wildHunter", text: "Get a multi-tool." }] },
    { id: 3, title: "Water purification techniques?", description: "Effective ways to ensure clean drinking water.", comments: [{ user: "camper23", text: "Boiling is the safest." }, { user: "offgridMike", text: "Use a water filter." }] }
  ]);

  const [selectedPost, setSelectedPost] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [image, setImage] = useState(null);

  const handlePostClick = (post) => {
    setSelectedPost(post);
  };

  const closePopup = () => {
    setSelectedPost(null);
    setNewComment("");
    setImage(null);
  };

  const handleAddComment = () => {
    if (newComment.trim() !== "" || image) {
      setSelectedPost({ ...selectedPost, comments: [...selectedPost.comments, { user: "anonymous", text: newComment, image }] });
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
          <button key={post.id} onClick={() => handlePostClick(post)} style={{ background: "white", padding: "15px", marginBottom: "10px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", textAlign: "left", border: "1px solid #ddd", cursor: "pointer", width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap" }}>
            <div style={{ flex: "1 1 auto", minWidth: "60%" }}>
              <h2 style={{ fontSize: "1.5rem", fontWeight: "bold", marginBottom: "5px", textAlign: "left" }}>{post.title}</h2>
              <div style={{ display: "flex", alignItems: "center" }}>
                <p style={{ fontSize: "1rem", color: "gray", fontWeight: "bold", marginRight: "10px" }}>Description:</p>
                <p style={{ fontSize: "1rem", color: "gray" }}>{post.description}</p>
              </div>
            </div>
            <img src={`/images/${post.id === 1 ? "question.png" : post.id === 2 ? "pickaxe.png" : "water.png"}`} alt="Post Image" style={{ width: "60px", height: "60px", flexShrink: 0 }} />
          </button>
        ))}
      </div>

      {/* Full Page Popup Window */}
      {selectedPost && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "white", color: "black", padding: "20px", textAlign: "center", zIndex: 20, overflowY: "auto" }}>
          <strong style={{ fontSize: "2rem" }}>{selectedPost.title}</strong>
          <div style={{ textAlign: "left", marginTop: "10px" }}>
            <p style={{ fontSize: "1rem", fontWeight: "bold" }}>Description:</p>
            <p style={{ fontSize: "1.2rem" }}>{selectedPost.description}</p>
          </div>

          {/* Comments Section */}
          <div style={{ textAlign: "left", marginTop: "20px" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>Comments:</h3>
            <ul>
              {selectedPost.comments.map((comment, index) => (
                <li key={index} style={{ marginBottom: "5px" }}>
                  <strong>{comment.user}:</strong> {comment.text}
                  {comment.image && <img src={comment.image} alt="User Upload" style={{ display: "block", maxWidth: "100px", marginTop: "5px" }} />}
                </li>
              ))}
            </ul>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              style={{ width: "100%", padding: "10px", marginTop: "10px", color: "black", background: "white", border: "1px solid black" }}
            ></textarea>
            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: "10px" }} />
            <button onClick={handleAddComment} style={{ marginTop: "10px", background: "black", color: "white", border: "none", padding: "5px 10px", cursor: "pointer", borderRadius: "3px" }}>Post Comment</button>
          </div>

          <button onClick={closePopup} style={{ marginTop: "20px", background: "black", color: "white", border: "none", padding: "10px 20px", cursor: "pointer", borderRadius: "5px" }}>Close</button>
        </div>
      )}
    </div>
  );
};

export default DiscussionForum;
