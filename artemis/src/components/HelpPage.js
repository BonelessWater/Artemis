import React, { useState, useRef, useEffect } from "react";

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

      // Append the model's response to the chat
      setMessages((prev) => [
        ...prev,
        { sender: "model", text: answer },
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

// DataQuery component styled in a similar minimal way
const DataQuery = () => {
  const data = [
    { id: 1, name: "Item One", description: "Description for item one" },
    { id: 2, name: "Item Two", description: "Description for item two" },
    { id: 3, name: "Item Three", description: "Description for item three" },
  ];

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleQuery = () => {
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div style={styles.dataQueryContainer}>
      <div style={styles.sectionHeader}>Data Query</div>
      <div style={styles.queryInputContainer}>
        <input
          type="text"
          placeholder="Enter query..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={styles.queryInput}
        />
        <button onClick={handleQuery} style={styles.queryButton}>
          Search
        </button>
      </div>
      <div style={styles.resultsContainer}>
        {results.length > 0 ? (
          <ul style={{ paddingLeft: "20px" }}>
            {results.map((item) => (
              <li key={item.id}>
                <strong>{item.name}:</strong> {item.description}
              </li>
            ))}
          </ul>
        ) : (
          <p style={styles.noResults}>No results found.</p>
        )}
      </div>
    </div>
  );
};

const HelpPage = () => (
  <div style={styles.pageContainer}>
    <h3 style={styles.pageHeader}>Help</h3>
    <p style={styles.pageSubheader}>
      Ask questions to the model or query data below.
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
