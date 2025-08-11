
# Project Heart Beat Audio Detection

Project Heart Beat Audio Detection is an innovative system designed to assist in the early detection of heart disease by analyzing heart sound recordings (phonocardiograms) using advanced machine learning techniques. The project aims to provide a user-friendly web interface where users can upload or record heart beat audio, which is then processed by a backend API to predict the likelihood of heart disease.

## Project Overview

Heart disease is a leading cause of mortality worldwide, and early detection is crucial for effective treatment and prevention. Traditional diagnostic methods often require specialized equipment and expertise. This project leverages the power of artificial intelligence to make heart disease screening more accessible and affordable by utilizing audio data that can be captured with simple recording devices.

The system consists of:
- **Frontend Web Application:** Allows users to upload or record heart beat audio, view prediction results, and access educational resources.
- **Backend API:** Processes the audio files, extracts relevant features, and uses a pre-trained machine learning model to predict the presence of heart disease.
- **Machine Learning Model:** Trained on real-world heart sound datasets to distinguish between healthy and abnormal heart sounds.

## Use Cases
- Remote and preliminary heart disease screening
- Educational tool for medical students and practitioners
- Research platform for experimenting with heart sound analysis

## Key Technologies
- Audio signal processing
- Machine learning (classification)
- Web development (frontend and backend)


## Features
- Frontend built with modern JavaScript frameworks (see `project/`)
- Backend API for audio processing and prediction (see `ml_backend/`)
- Pre-trained model for heart disease detection

## Getting Started

### Prerequisites
- Node.js and npm (for frontend)
- Python 3 and pip (for backend)

### Installation
1. **Clone the repository**
2. **Install frontend dependencies:**
   ```sh
   cd project
   npm install
   ```
3. **Install backend dependencies:**
   ```sh
   cd ../ml_backend
   pip install -r requirements.txt
   ```

### Running the Application
- **Frontend:**
  ```sh
  cd project
  npm run dev
  ```
- **Backend:**
  ```sh
  cd ml_backend
  python app.py
  ```

## Project Structure
- `project/` - Frontend source code
- `ml_backend/` - Backend API and ML model

## License
MIT
