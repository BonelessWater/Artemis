// src/components/ResearchPage.js
import React from 'react';

const tasks = [
  {
    researcher: "Dr. Linda Green - EcoCorp",
    requirement: "Collect 500ml water sample from the Blue Ridge Stream.",
    location: "Blue Ridge National Park",
    reward: "5 ArtemisPoints"
  },
  {
    researcher: "Prof. John Fields - SoilSense",
    requirement: "Gather 200g soil sample near the Old Oak Tree.",
    location: "Redwood Forest Park",
    reward: "10 ArtemisPoints"
  },
  {
    researcher: "Dr. Anna Moss - FloraFinders",
    requirement: "Retrieve a plant sample from the endangered Wild Orchid patch.",
    location: "Emerald Valley Park",
    reward: "8 ArtemisPoints"
  },
  {
    researcher: "Mr. Alan Hart - RiverRun",
    requirement: "Secure a water purity test sample from the Silver River.",
    location: "Silver River Park",
    reward: "7 ArtemisPoints"
  },
  {
    researcher: "Dr. Emily Berry - Nature's Bounty",
    requirement: "Collect a variety of leaf samples for analysis.",
    location: "Sunset Park",
    reward: "9 ArtemisPoints"
  }
];

// Helper function to select the image based on the task requirement
const getImageSrc = (requirement) => {
  const req = requirement.toLowerCase();
  if (req.includes("water"))
    return process.env.PUBLIC_URL + "/images/water_sample.webp";
  if (req.includes("soil"))
    return process.env.PUBLIC_URL + "/images/soil_sample.png";
  if (req.includes("plant") || req.includes("leaf"))
    return process.env.PUBLIC_URL + "/images/plant_sample.png";
  // Fallback image if none of the keywords are found
  return process.env.PUBLIC_URL + "/images/default_sample.webp";
};

const ResearchPage = () => {
  return (
    <div className="container" style={{ marginTop: '30px' }}>
      <h3
        className="center-align"
        style={{
          fontFamily: 'Fantasy, cursive',
          color: 'rgba(77, 203, 70, 0.92)',
          //textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
        }}
      >
        Bounties
      </h3>
      <div className="row">
        {tasks.map((task, index) => (
          <div className="col s12 m12" key={index}>
            <div
              className="card"
              style={{
                backgroundColor: '#f5f5f5',
                border: '2px solid #83CC6D',
                boxShadow: '2px 2px 5px rgba(0,0,0,0.3)'
              }}
            >
              <div className="card-content">
                <div className="row" style={{ marginBottom: 0 }}>
                  {/* Left side: Task details */}
                  <div className="col s8">
                    <span
                      className="card-title"
                      style={{ fontFamily: 'Fantasy, cursive', color: '#83CC6D' }}
                    >
                      {task.researcher}
                    </span>
                    <p>
                      <strong>Task: </strong>{task.requirement}
                    </p>
                    <p>
                      <strong>Location: </strong>{task.location}
                    </p>
                    <p>
                      <strong>Reward: </strong>{task.reward}
                    </p>
                  </div>
                  {/* Right side: Task image */}
                  <div className="col s4">
                    <img 
                      src={getImageSrc(task.requirement)}
                      alt="Task" 
                      className="responsive-img" 
                      style={{ width: '150px', height: 'auto' }}
                    />
                  </div>
                </div>
              </div>
              <div className="card-action">
                <a 
                  href="#!" 
                  style={{
                    fontFamily: 'Fantasy, cursive',
                    fontWeight: 'bold',
                    color: '#83CC6D'
                  }}
                >
                  Claim Bounty
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchPage;
