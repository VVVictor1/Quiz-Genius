# QuizGenius – Final Project Setup Guide

Hello!

This project contains a full-stack AI-powered quiz generator and quiz taker, built with React (frontend) and Node.js/Express (backend).


## 📁 PROJECT STRUCTURE
=======================
- quiz-frontend/   # React + TypeScript frontend
- quiz-backend/    # Node.js + Express + PostgreSQL backend


## 🚀 GETTING STARTED
=======================

PREREQUISITES:
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL

-----------------------
A. BACKEND SETUP
-----------------------
1. Open a terminal and navigate to the backend folder:
   cd quiz-backend
2. Install dependencies:
   npm install
3. Create a `.env` file in `quiz-backend/` (see `quiz-backend/README.md` for required variables).
4. Set up the database:
   npx sequelize-cli db:migrate
5. Start the backend server:
   npm run dev

-----------------------
B. FRONTEND SETUP
-----------------------
1. Open a new terminal and navigate to the frontend folder:
   cd quiz-frontend
2. Install dependencies:
   npm install
3. Create a `.env` file in `quiz-frontend/` (see `quiz-frontend/README.md` for required variables).
4. Start the frontend development server:
   npm start

-----------------------
USAGE
-----------------------
- Access the app at http://localhost:3000 after both servers are running.
- Register a new user or log in to start generating and taking quizzes.

-----------------------
DOCUMENTATION
-----------------------
- For API endpoints, environment variables, and more, see the `README.md` files in each subfolder.

-----------------------
LICENSE
-----------------------
This project is licensed under the MIT/ISC License.

Need help? Check the `README.md` files in each folder or open an issue on GitHub.

