import React, { useState } from "react";

const fileNames = [
  "Data/Emergency Plan Templates/Basic Emergency Plan.pdf",
  "Data/First Aid/Where-There-is-No-Dentist.pdf",
  "Data/First Aid/Where-There-is-no-Doctor-a-Village-Health-Care-Handbook.pdf",
  "Data/Nuclear and Radiation Resources/Build-a-Protective-Fallout-Shelter.pdf",
  "Data/Nuclear and Radiation Resources/Family-Shelter-Designs-DOD-Civil-Defense.pdf",
  "Data/Nuclear and Radiation Resources/Nuclear-War-Survival-Skills-Cresson-Kearny.pdf",
  "Data/Nuclear and Radiation Resources/Planning-Guidance-for-Response-to-Nuclear-Detonation-May-2022-FEMA.pdf",
  "Data/Preparedness Manuals/Be Prepared Estonia Crisis Guide Paasteamet ERB.pdf",
  "Data/Preparedness Manuals/FEMA Citizen Preparedness Guide.pdf",
  "Data/Preparedness Manuals/LDS-Preparedness-Manual.pdf",
  "Data/Preparedness Manuals/Norway One Week Preparedness Guide.pdf",
  "Data/Quick Reference Pages/Military-Phonetic-Alphabet.pdf",
  "Data/Quick Reference Pages/Universal-Edibility-Test-for-Survival.pdf",
  "Data/Survival Checklists/Bug Out Bag Checklist 2 Page 2024.pdf",
  "Data/Survival Checklists/Bug Out Vehicle Checklist.pdf",
  "Data/Survival Checklists/Car Survival Kit Checklist.pdf",
  "Data/Survival Checklists/Dog Bug Out Bag Checklist.pdf",
  "Data/Survival Checklists/Everyday Carry Checklist 2 Page.pdf",
  "Data/Survival Checklists/Flood Survival Kit Checklist.pdf",
  "Data/Survival Checklists/Get Home Bag Checklist 2 Page.pdf",
  "Data/Survival Checklists/Home Survival Kit Checklist 2 Page.pdf",
  "Data/Survival Checklists/INCH Bag Checklist 2 Page.pdf",
  "Data/Survival Checklists/Kids Bug Out Bag Checklist.pdf",
  "Data/Survival Checklists/Nuclear Survival Kit Checklist.pdf",
  "Data/Survival Checklists/SCARE Bag Checklist.pdf",
  "Data/Survival Checklists/Survival First Aid Kit Checklist.pdf",
  "Data/Survival Checklists/Survival Food Checklist.pdf",
  "Data/Survival Manuals/Canadian Military Fieldcraft.pdf",
  "Data/Survival Manuals/CIA RDP78 Introdution to Survival.pdf",
  "Data/Survival Manuals/Down-But-Not-Out-Canadian-Survival-Manual.pdf",
  "Data/Survival Skills/Canadian Military Basic Cold Weather Training.pdf",
  "Data/Survival Skills/Deadfalls-and-Snares.pdf",
  "Data/Survival Skills/Paleo-Pocalypse.pdf",
  "Data/Survival Skills/Shelters-Shacks-and-Shanties.pdf",
  "Data/Threat Guidance/DTRA Collateral Damage to Satellites from an EMP Attack.pdf",
  "Data/Threat Guidance/Nuclear-Winter-The-Anthropology-of-Human-Survival.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-20-3-Camouflage-Concealment-and-Decoys.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-21-10 Field Hygiene and Sanitation.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-3-06-Urban-Operations-FM-90-10-US-Army.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-3-25-150 Combatives.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-3-25-26 Map Reading and Land Navigation.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-3-3-1-Nuclear Contamination Avoidance.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-3-4 NBC Protection.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-3-5 NBC Decontamination.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-4-25-11-First_Aid.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FM-5-103-Survivability.pdf",
  "Data/US Military Manuals/Military Skill Manuals/FMFRP 12-80 USMC Kill or Get Killed.pdf",
  "Data/US Military Manuals/Military Skill Manuals/MA 1.02 USMC Fundamentals of Martial Arts.pdf",
  "Data/US Military Manuals/Military Skill Manuals/ST-31-91B-US-Army-Special-Forces-Medical-Handbook.pdf",
  "Data/US Military Manuals/Military Skill Manuals/STP-21-1-Army Warrior Skills Level 1 Soldiers Manual of Common Tasks.pdf",
  "Data/US Military Manuals/Military Skill Manuals/STP-21-24-Army Warrior Leader Skills Level 2, 3, and 4.pdf",
  "Data/US Military Manuals/Military Skill Manuals/TM-31-210-Improvised-Munitions-Handbook.pdf",
  "Data/US Military Manuals/Military Survival Guides/FM-21-76-1-Survival-Evasion-and-Recovery-Multiservice-Procedures.pdf",
  "Data/US Military Manuals/Military Survival Guides/FM-21-76-US-Army-Survival-Manual.pdf",
  "Data/US Military Manuals/Military Survival Guides/FM-31-70-Basic-Cold-Weather-Manual.pdf",
  "Data/US Military Manuals/Military Survival Guides/USMC Summer Survival Course Handbook.pdf",
  "Data/US Military Manuals/Military Survival Guides/USMC Winter Survival Course Handbook.pdf"
];

// Create a dictionary with just the filename as key and the full path as value
const fileDict = fileNames.reduce((dict, path) => {
  const parts = path.split("/");
  const fileName = parts[parts.length - 1];
  dict[fileName] = path;
  return dict;
}, {});

console.log(fileDict);

const FileAutocomplete = ({ onSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    // Filter based on the filename keys
    if (value.length > 0) {
      const filtered = Object.keys(fileDict).filter((fileName) =>
        fileName.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSuggestions([]);
    // Get the full file path using the filename key from fileDict
    const filePath = fileDict[suggestion];
    console.log(filePath);
    if (onSelect) {
      onSelect(filePath);
    }
  };

  return (
    <div style={autocompleteStyles.container}>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search files..."
        style={autocompleteStyles.input}
      />
      {suggestions.length > 0 && (
        <ul style={autocompleteStyles.suggestionsList}>
          {suggestions.map((suggestion, index) => (
            <li
              key={index}
              style={autocompleteStyles.suggestionItem}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const autocompleteStyles = {
  container: {
    position: "relative",
    width: "100%",
    maxWidth: "600px",
    margin: "0 auto",
  },
  input: {
    width: "100%",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
  },
  suggestionsList: {
    listStyle: "none",
    padding: "0",
    margin: "0",
    position: "absolute",
    top: "100%",
    left: "0",
    right: "0",
    backgroundColor: "#fff",
    border: "1px solid #ccc",
    borderTop: "none",
    zIndex: 1000,
    maxHeight: "200px",
    overflowY: "auto",
  },
  suggestionItem: {
    padding: "10px",
    cursor: "pointer",
    borderBottom: "1px solid #eee",
  },
};

export default FileAutocomplete;
