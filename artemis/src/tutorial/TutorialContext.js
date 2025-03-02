import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const TutorialContext = createContext();

export const useTutorial = () => useContext(TutorialContext);

export const TutorialProvider = ({ children }) => {
  const [tutorialStep, setTutorialStep] = useState(0);
  const [isTutorialActive, setIsTutorialActive] = useState(false);
  const navigate = useNavigate();

  const startTutorial = () => {
    setIsTutorialActive(true);
    setTutorialStep(1);
  };

  const nextStep = () => {
    setTutorialStep((prev) => prev + 1);
  };

  const goToStep = (step, path) => {
    navigate(path);
    setTutorialStep(step);
  };

  const endTutorial = () => {
    setIsTutorialActive(false);
    setTutorialStep(0);
  };

  return (
    <TutorialContext.Provider value={{ tutorialStep, isTutorialActive, startTutorial, nextStep, goToStep, endTutorial }}>
      {children}
    </TutorialContext.Provider>
  );
};
