// src/components/ResearchPage.js
import React from 'react';
import CartoonyButton from '../components/CartoonyButton';

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
    return process.env.PUBLIC_URL + "/images/bounty/water_sample.webp";
  if (req.includes("soil"))
    return process.env.PUBLIC_URL + "/images/bounty/soil_sample.png";
  if (req.includes("plant") || req.includes("leaf"))
    return process.env.PUBLIC_URL + "/images/bounty/plant_sample.png";
  // Fallback image if none of the keywords are found
  return process.env.PUBLIC_URL + "/images/bounty/default_sample.webp";
};

const ResearchPage = () => {
  return (
    <div className="container research-override" style={{ marginTop: '30px' }}>
      {/* Global override for text color */}
      <style>
        {`
          .research-override, 
          .research-override h3, 
          .research-override .card, 
          .research-override .card * {
            color: black !important;
          }
        `}
      </style>
      
      {/* White header with back button */}
      <div
            className="white-header" 
        style={{
          background: 'white',
          padding: '0px 20px',
          marginBottom: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%'
        }}
      >
        <CartoonyButton to="/" color="rgb(83, 211, 147)" size="medium" width="auto">
          Back
        </CartoonyButton>
        <h1 
          style={{
            margin: 0,
            fontFamily: 'Fantasy, cursive',
            color: 'black',
            textAlign: 'center',
            flexGrow: 1
          }}
        >
          Bounties
        </h1>
        {/* Empty space for alignment (or you can add another button if desired) */}
        <div style={{ width: '90px' }}></div>
      </div>
      
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
                      style={{ fontFamily: 'Fantasy, cursive' }}
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
                  <div className="col s4" style={{ textAlign: 'right' }}>
                    <img 
                      src={getImageSrc(task.requirement)}
                      alt="Task" 
                      className="responsive-img" 
                      style={{ width: '100px', height: 'auto', marginRight: '20px' }}
                    />
                  </div>
                </div>
              </div>
              <div className="card-action">
                <CartoonyButton to="/" color="rgb(83, 211, 147)" size="medium" width="50%">
                  Claim Bounty
                </CartoonyButton>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResearchPage;
