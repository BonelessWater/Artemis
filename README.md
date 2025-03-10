# Artemis

**Enhancing the hiking experience and promoting environmentalism**

*Welcome to our Hackathon submission*

Artemis is a revolutionary mobile application designed by hikers, for hikers. Built using React Native and Flask, Artemis empowers outdoor enthusiasts with tailored features that enhance their connection with nature while motivating sustainable practices and environmental awareness.

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Project Setup Guide](#project-setup-guide)
    - [Prerequisites](#prerequisites)
    - [Setup Python Virtual Environment](#setup-python-virtual-environment)
    - [Install Backend Dependencies](#install-backend-dependencies)
    - [Install Frontend Dependencies](#install-frontend-dependencies)
    - [Running the Development Servers](#running-the-development-servers)
5. [Usage](#usage)
6. [Contributing](#contributing)

---

## Overview

Artemis is more than just an app—it’s your outdoor companion. Whether you’re a novice hiker or a seasoned explorer, Artemis streamlines your journey by offering:
- Real-time SOS alerts for emergency situations.
- Nature mini games that both educate and entertain.
- Friend location tracking to help you stay connected.
- Comprehensive research tools and survival manuals.
- Offline functionality ensuring vital information is always available.

An innovative highlight of Artemis is its symbiotic feature that allows users to collaborate with researchers. Hikers can opt to collect and share environmental samples in exchange for compensation, fostering a community-driven approach to scientific research and conservation.

---

## Key Features

- **Research & Education:** Query the app for hiking tips, survival manuals, and environmental data.
- **Nature Mini Games:** Engage with interactive games designed to teach about flora, fauna, and sustainability.
- **Friend Location Tracking:** Stay connected with your hiking group or emergency contacts.
- **SOS & Safety:** Instant emergency services alert with offline contingencies.
- **Personalized Checklists:** Tailor your prep list for every adventure.
- **Symbiotic Research Collaboration:** Team up with researchers by collecting and sharing nature samples, earning rewards for your contribution.

---

## Tech Stack

- **Frontend:** [React Native](https://reactnative.dev/) – Designed for a seamless mobile user experience.
- **Backend:** [Flask](https://flask.palletsprojects.com/) – Provides robust APIs and offline support.
- **Other Tools:** Node.js, npm, and Python virtual environments ensure smooth development and deployment.

---

## Project Setup Guide

### Prerequisites

Ensure the following software is installed on your system:
- **Python** (Version 3.8 or higher)
- **pip** (Python package manager)
- **Node.js** and **npm** (Node Package Manager)
- **Flask** (Python microframework)

Verify installations:
```bash
python --version
pip --version
node --version
npm --version
```

---

### Setup Python Virtual Environment
It’s recommended to create a virtual environment to isolate dependencies.

Create a virtual environment:
```bash
python -m venv venv
```

Windows:

```bash
python -m venv venv
venv\Scripts\activate
```
macOS/Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```
Verify the virtual environment is active.
You should see (venv) at the beginning of your terminal prompt.

---                                                                                                                              
### Install Backend Dependencies

With the virtual environment activated, install the required Python packages.

Install dependencies using pip:
```bash
pip install -r requirements.txt
```

---

### Install Frontend Dependencies

Switch to the frontend directory (named artemis) and install the Node.js dependencies:

```bash
cd ../artemis
npm install
npm fund
```

---

### Running the Development Servers

Start both the frontend and backend servers in separate terminal windows. 

```bash
cd artemis
npm start
```

```bash
cd ../backend
python app.py
```

---

## Usage

Once the servers are running, Artemis is ready to accompany you on your hikes. Explore features such as:

- Browsing survival manuals and research articles.
- Playing nature mini games.
- Tracking friends on the trail.
- Activating SOS in case of emergencies.
- Creating and managing personalized hiking checklists.
- Collaborating with researchers by collecting environmental samples

---

## Contributing

We welcome contributions from the community. To get involved:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Commit your changes with clear, descriptive messages.
4. Submit a pull request detailing your modifications.
