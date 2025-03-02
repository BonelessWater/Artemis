// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './auth/Login';
import Signup from './auth/Signup';
import Body from './components/Body';

import ResearchPage from './components/ResearchPage';
import HelpPage from './components/HelpPage';
import PrepPage from './components/PrepPage';
import AcheivementPage from './components/AchievementPage';

import 'materialize-css/dist/css/materialize.min.css';

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

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Body />} />

        <Route path="/research" element={<ResearchPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/prep" element={<PrepPage />} />
        <Route path="/achieve" element={<AcheivementPage />} />
        <Route path="/prep" element={<PrepPage />} />

      </Routes>
    </Router>
  </div>
);

export default App;
