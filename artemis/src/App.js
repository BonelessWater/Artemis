// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Body from './components/Body';
import ResearchPage from './components/ResearchPage';

// Placeholder component for the Settings page
const SettingsPage = () => (
  <div className="container" style={{ marginTop: '30px' }}>
    <h3>Settings</h3>
    <p>Settings page content goes here.</p>
  </div>
);

// Placeholder component for the Help page
const HelpPage = () => (
  <div className="container" style={{ marginTop: '30px' }}>
    <h3>Help</h3>
    <p>Help page content goes here.</p>
  </div>
);

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Body />} />
      <Route path="/research" element={<ResearchPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="/help" element={<HelpPage />} />
    </Routes>
  </Router>
);

export default App;
