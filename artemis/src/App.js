// src/App.js
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Body from './components/Body';
import ResearchPage from './components/ResearchPage';

const App = () => (
  <>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="/research" element={<ResearchPage />} />
      </Routes>
    </Router>
  </>
);

export default App;
