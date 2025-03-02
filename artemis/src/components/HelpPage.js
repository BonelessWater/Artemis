import React, { useState, useRef, useEffect } from "react";
import FileAutocomplete from "./FileAutocomplete";
import CartoonyButton from "./CartoonyButton";

// Helper function to format the output string
const formatOutput = (text) => {
  if (text.startsWith('"') && text.endsWith('"')) {
    text = text.slice(1, -1);
  }
  return text.replace(/\\n/g, "\n");
};

// ChatBox component styled like ChatGPT conversation area
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim() === "") return;
    const userMessage = input.trim();
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setInput("");

    try {
      const response = await fetch(`/LLM_chat?prompt=${encodeURIComponent(userMessage)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const answer = await response.text();
      const formattedAnswer = formatOutput(answer);
      setMessages((prev) => [...prev, { sender: "model", text: formattedAnswer }]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "model", text: "Error: Unable to get a response." },
      ]);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div style={styles.chatContainer}>
      <div style={styles.chatHeader}>Chat with Artemis</div>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.messageBubble,
              ...(msg.sender === "user" ? styles.userBubble : styles.modelBubble),
              whiteSpace: "pre-wrap",
            }}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div style={styles.inputContainer}>
        <input
          type="text"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          style={styles.inputField}
        />
        <button onClick={sendMessage} style={styles.sendButton}>
          Send
        </button>
      </div>
    </div>
  );
};

const DataQuery = () => {
  const [fileQuery, setFileQuery] = useState("");
  const [fileURL, setFileURL] = useState("");

  const handleSearchFile = async () => {
    if (!fileQuery) return;
    try {
      const response = await fetch(`/get_file?filepath=${encodeURIComponent(fileQuery)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setFileURL(url);
    } catch (error) {
      console.error("Error fetching file content:", error);
      setFileURL("");
    }
  };

  return (
    <div style={styles.dataQueryContainer}>
      <div style={styles.sectionHeader}>Data Query</div>
      <div style={styles.searchContainer}>
        <div style={styles.searchInputWrapper}>
          <FileAutocomplete onSelect={(file) => setFileQuery(file)} />
        </div>
        <button onClick={handleSearchFile} style={styles.searchButton}>
          Search
        </button>
      </div>
      {fileQuery && fileURL && (
        <div>
          <p style={styles.fileInfo}>
            Selected File: <strong>{fileQuery}</strong>
          </p>
          <iframe 
            src={fileURL} 
            title="PDF Viewer" 
            width="100%" 
            height="600px" 
            style={{ border: "none" }}
          />
        </div>
      )}
    </div>
  );
};

const HelpPage = () => {
  const [activeMode, setActiveMode] = useState("chat");

  return (
    <div style={styles.pageContainer}>
      <div
        className="white-header"
        style={{
          background: "white",
          padding: "0px 20px",
          marginBottom: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <CartoonyButton to="/" color="rgb(83, 211, 147)" size="medium" width="auto">
          Back
        </CartoonyButton>
        <h1
          style={{
            margin: 0,
            fontFamily: "Fantasy, cursive",
            color: "black",
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          Help
        </h1>
        <div style={{ width: "90px" }}></div>
      </div>
      <div style={styles.toggleContainer}>
        <button
          style={{
            ...styles.toggleButton,
            ...(activeMode === "chat" ? styles.activeToggle : {}),
          }}
          onClick={() => setActiveMode("chat")}
        >
          Chat
        </button>
        <button
          style={{
            ...styles.toggleButton,
            ...(activeMode === "data" ? styles.activeToggle : {}),
          }}
          onClick={() => setActiveMode("data")}
        >
          Data Query
        </button>
      </div>
      {activeMode === "chat" ? <ChatBox /> : <DataQuery />}
    </div>
  );
};

const styles = {
  pageContainer: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "0 20px",
    fontFamily: "Arial, sans-serif",
  },
  toggleContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  toggleButton: {
    padding: "10px 20px",
    margin: "0 5px",
    border: "1px solid #007bff",
    backgroundColor: "#fff",
    color: "#007bff",
    cursor: "pointer",
    borderRadius: "4px",
  },
  activeToggle: {
    backgroundColor: "#007bff",
    color: "#fff",
  },
  // Chat Box styles
  chatContainer: {
    border: "1px solid #e1e1e1",
    borderRadius: "8px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    height: "600px", // Adjust this value to change chatbox height.
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  chatHeader: {
    backgroundColor: "#f7f7f8",
    padding: "10px",
    borderBottom: "1px solid #e1e1e1",
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
  messagesContainer: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    backgroundColor: "#fff",
  },
  messageBubble: {
    padding: "10px",
    borderRadius: "16px",
    marginBottom: "10px",
    maxWidth: "70%",
    lineHeight: "1.4",
    wordWrap: "break-word",
    color: "#000",
  },
  userBubble: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  modelBubble: {
    backgroundColor: "#e1e1e1",
    border: "1px solid #e1e1e1",
    alignSelf: "flex-start",
    marginRight: "auto",
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    borderTop: "1px solid #e1e1e1",
    padding: "10px",
    backgroundColor: "#f7f7f8",
  },
  // TALLER input field; adjust height here as needed.
  inputField: {
    flex: 1,
    padding: "10px",
    height: "50px", // Increased height for the input textbox.
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
    color: "#000",
  },
  sendButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  // Data Query styles
  dataQueryContainer: {
    marginTop: "20px",
    border: "1px solid #e1e1e1",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#000",
  },
  searchContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "20px",
  },
  searchInputWrapper: {
    flex: 1,
    marginRight: "10px", // Ensure space between input and button.
  },
  searchButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  fileInfo: {
    color: "#000",
  },
};

export default HelpPage;
