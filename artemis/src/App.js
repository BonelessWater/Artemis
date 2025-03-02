// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import ResearchPage from './components/ResearchPage';
import HelpPage from './components/HelpPage';
import AcheivementPage from './components/AchievementPage';
import PrepPage from './components/PrepPage';

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
      backgroundPosition: "center top", // centers horizontally and aligns at the top vertically
      backgroundRepeat: "repeat-y",       // repeats vertically only
      backgroundSize: "auto",             // use natural image size, remove "cover"
      height: "200vh"
    }}
  >
    <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/research" element={<ResearchPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/achieve" element={<AcheivementPage />} />
        <Route path="/prep" element={<PrepPage />} />
      </Routes>
    </Router>
  </div>
);

export default App;
