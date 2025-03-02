import React, { useState, useRef, useEffect } from "react";
import FileAutocomplete from "./FileAutocomplete";

// Helper function to format the output string
const formatOutput = (text) => {
  // Remove leading and trailing double quotes if present
  if (text.startsWith('"') && text.endsWith('"')) {
    text = text.slice(1, -1);
  }
  // Replace literal "\n" with actual newline characters
  return text.replace(/\\n/g, "\n");
};

// ChatBox component styled like ChatGPT conversation area
const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Append user message immediately
    const userMessage = input.trim();
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: userMessage },
    ]);
    setInput("");

    try {
      // Fetch response from Flask endpoint, sending the user's message as a query parameter
      const response = await fetch(`/LLM_chat?prompt=${encodeURIComponent(userMessage)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const answer = await response.text();

      // Process the output to format newlines and remove extra quotes
      const formattedAnswer = formatOutput(answer);

      // Append the model's response to the chat
      setMessages((prev) => [
        ...prev,
        { sender: "model", text: formattedAnswer },
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "model", text: "Error: Unable to get a response." },
      ]);
    }
  };

  // Scroll to the bottom on new messages
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
              ...(msg.sender === "user"
                ? styles.userBubble
                : styles.modelBubble),
              whiteSpace: "pre-wrap", // Ensures newline characters are rendered correctly
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
  const [selectedFile, setSelectedFile] = useState("");
  const [fileURL, setFileURL] = useState("");

  const handleFileSelect = async (file) => {
    setSelectedFile(file);
    try {
      const response = await fetch(`/get_file?filepath=${encodeURIComponent(file)}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Get the file as a Blob
      const blob = await response.blob();
      // Create a URL for the Blob so it can be rendered
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
      <FileAutocomplete onSelect={handleFileSelect} />
      {selectedFile && fileURL && (
        <div>
          <p>
            Selected File: <strong>{selectedFile}</strong>
          </p>
          {/* Display the PDF in an iframe */}
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


const HelpPage = () => (
  <div style={styles.pageContainer}>
    <h3 style={styles.pageHeader}>Help</h3>
    <p style={styles.pageSubheader}>
    </p>
    <ChatBox />
    <DataQuery />
  </div>
);

// Combined inline styles for the HelpPage, ChatBox, and DataQuery components
const styles = {
  pageContainer: {
    maxWidth: "800px",
    margin: "30px auto",
    padding: "0 20px",
    fontFamily: "Arial, sans-serif",
    color: "#333",
  },
  pageHeader: {
    textAlign: "center",
  },
  pageSubheader: {
    textAlign: "center",
    color: "#666",
  },
  chatContainer: {
    border: "1px solid #e1e1e1",
    borderRadius: "8px",
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    height: "400px",
    overflow: "hidden",
    backgroundColor: "#fff",
  },
  chatHeader: {
    backgroundColor: "#f7f7f8",
    padding: "10px",
    borderBottom: "1px solid #e1e1e1",
    textAlign: "center",
    fontWeight: "bold",
  },
  messagesContainer: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    backgroundColor: "#fafafa",
  },
  messageBubble: {
    padding: "10px",
    borderRadius: "16px",
    marginBottom: "10px",
    maxWidth: "70%",
    lineHeight: "1.4",
    wordWrap: "break-word",
  },
  userBubble: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  modelBubble: {
    backgroundColor: "#fff",
    border: "1px solid #e1e1e1",
    alignSelf: "flex-start",
    marginRight: "auto",
  },
  inputContainer: {
    display: "flex",
    borderTop: "1px solid #e1e1e1",
    padding: "10px",
    backgroundColor: "#f7f7f8",
  },
  inputField: {
    flex: 1,
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    marginRight: "10px",
  },
  sendButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
  dataQueryContainer: {
    marginTop: "40px",
    border: "1px solid #e1e1e1",
    borderRadius: "8px",
    padding: "20px",
    backgroundColor: "#fff",
  },
  sectionHeader: {
    fontSize: "18px",
    marginBottom: "10px",
    fontWeight: "bold",
  },
  queryInputContainer: {
    display: "flex",
    marginBottom: "20px",
  },
  queryInput: {
    flex: 1,
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginRight: "10px",
  },
  queryButton: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#28a745",
    color: "#fff",
    cursor: "pointer",
  },
  resultsContainer: {
    maxHeight: "200px",
    overflowY: "auto",
  },
  noResults: {
    color: "#999",
  },
};

export default HelpPage;
