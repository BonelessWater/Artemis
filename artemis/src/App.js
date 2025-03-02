// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import ResearchPage from './components/ResearchPage';
import HelpPage from './components/HelpPage';
import AcheivementPage from './components/AchievementPage';

// Placeholder components...
const SettingsPage = () => (
  <div className="container" style={{ marginTop: '30px' }}>
    <h3>Settings</h3>
    <p>Settings page content goes here.</p>
  </div>
);

const App = () => (
  <div
    style={{
      backgroundImage: `url(${process.env.PUBLIC_URL + "/images/pixelated-background2.png"})`,
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
