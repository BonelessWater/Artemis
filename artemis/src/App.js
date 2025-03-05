import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TutorialProvider } from './tutorial/TutorialContext';
import TutorialPopup from './tutorial/TutorialPopup';

import Body from './pages/Body';
import ResearchPage from './pages/ResearchPage';
import HelpPage from './pages/HelpPage';
import PrepPage from './pages/PrepPage';
import AchievementPage from './pages/AchievementPage';

import 'materialize-css/dist/css/materialize.min.css';

const App = () => (
  <Router>
    <TutorialProvider>
      <TutorialPopup />
      <div
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL + "/images/menu/pixelated-background.png"})`,
          backgroundPosition: "center top",
          backgroundRepeat: "repeat-y",
          backgroundSize: "auto",
          height: "200vh"
        }}
      >
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/prep" element={<PrepPage />} />
          <Route path="/achieve" element={<AchievementPage />} />
        </Routes>
      </div>
    </TutorialProvider>
  </Router>
);

export default App;
