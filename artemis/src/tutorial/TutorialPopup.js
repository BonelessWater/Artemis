import React from "react";
import { useTutorial } from "./TutorialContext";

const tutorialSteps = {
  1: { message: "Welcome to Artemis! Made for hikers, by hikers.", next: 2 },
  2: { message: "This is the main page. Let's find out what everything does. Click 'Next' to go to Bounty.", next: 3, path: "/research" },
  3: { message: "Here, you can help researchers in exchange for Artemis points.", next: 4 },
  4: { message: "You can redeem those points for money!", next: 5 },
  5: { message: "Let's check out the Help section next.", next: 6, path: "/help" },
  6: { message: "In this page, you can get advice by asking an AI professional.", next: 7 },
  7: { message: "You can also look for information from downloadable files in case you don’t have WiFi.", next: 8, path: "/prep" },
  8: { message: "In this page, you can chat with like-minded individuals to ask or answer questions in your community.", next: 9 },
  9: { message: "Click 'Next' to go to Achievements.", next: 10, path: "/achieve" },
  10: { message: "As you fulfill your hiking journey, you can log your achievements here.", next: 11 },
  11: { message: "You can also compete against your friends. No cheating!", next: 12 },
  12: { message: "That's about it! There are some other features, but I'm sure you'll learn them along the way. Click 'Finish' to complete the tutorial.", lastStep: true },
};

const TutorialPopup = () => {
  const { tutorialStep, isTutorialActive, nextStep, goToStep, endTutorial } = useTutorial();
  const step = tutorialSteps[tutorialStep];

  if (!isTutorialActive || !step) return null;

  return (
    <div style={popupStyles.container}>
      <div style={popupStyles.popup}>
        {/* Image in the top-left */}
        <img src="/images/artemis-cute.png" alt="Artemis Cute" style={popupStyles.image} />
        <p style={popupStyles.text}>{step.message}</p>
        <div style={popupStyles.buttonContainer}>
          {step.path ? (
            <button onClick={() => goToStep(step.next, step.path)} style={popupStyles.button}>
              Next
            </button>
          ) : step.lastStep ? (
            <button onClick={endTutorial} style={popupStyles.button}>
              Finish
            </button>
          ) : (
            <button onClick={nextStep} style={popupStyles.button}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

const popupStyles = {
  container: {
    position: "fixed",
    top: "20%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
  },
  popup: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
    textAlign: "center",
    width: "320px",
    position: "relative",
  },
  image: {
    position: "absolute",
    top: "-60px",
    left: "-60px",
    width: "150px",
    height: "150px",
  },
  text: {
    color: "black",
    fontSize: "16px",
    marginTop: "50px",
    padding: "10px",
  },
  buttonContainer: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "rgb(83, 211, 147)",
    color: "white",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    minWidth: "100px", // Ensures button stays in the same spot
    fontSize: "14px",
  },
};

export default TutorialPopup;
