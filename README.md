# ChatBot Application

## Overview

This project is a ChatBot application built with React.js for the frontend and Node.js/Express.js for the backend. It uses the OpenAI API to generate responses.

## Features

- User authentication (signup, login, logout)
- Chat with AI using OpenAI API
- Manage chat history (view, delete)
- Type animations for an engaging user experience

## Technologies Used

- **Frontend**: React.js, TypeScript, Material-UI, Axios
- **Backend**: Node.js, Express.js, MongoDB, Mongoose, bcrypt
- **Authentication**: JWT, Cookies
- **Styling**: CSS, Material-UI

## Installation

### Prerequisites

- Node.js and npm installed
- MongoDB instance running

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/Dfortune014/MERN-AI-ChatBot-starting-project.git
   cd your-repo-name
   ```
2. Install dependencies for both frontend and backend:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```
3. Set up environment variables:

- Create a .env file in the backend directory and add the following variables:
  .env
  MONGO_URI=your-mongodb-uri
  JWT_SECRET=your-jwt-secret
  OPENAI_API_KEY=your-openai-api-key
  COOKIE_SECRET=your-cookie-secret

4. Start the development servers:
