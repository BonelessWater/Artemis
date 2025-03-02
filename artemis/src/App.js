// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import ResearchPage from './components/ResearchPage';

// Placeholder components...
const SettingsPage = () => (
  <div className="container" style={{ marginTop: '30px' }}>
    <h3>Settings</h3>
    <p>Settings page content goes here.</p>
  </div>
);

const HelpPage = () => (
  <div className="container" style={{ marginTop: '30px' }}>
    <h3>Help</h3>
    <p>Help page content goes here.</p>
  </div>
);

const AcheivementPage = () => (
  <div className="container" style={{ marginTop: '30px' }}>
    <h3>This is where achievements go</h3>
    <p>achievements page content goes here.</p>
  </div>
);

const App = () => (
  <div
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + "/images/background.png"})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      height: "100vh"
    }}
  >
    <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/achieve" element={<AcheivementPage />} />
      </Routes>
    </Router>
  </div>
);

export default App;
