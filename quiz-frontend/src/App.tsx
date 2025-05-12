import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import GettingStarted from './pages/Getting_Started';
import { AuthProvider, RedirectIfNOTAuthenticated, ProtectedRoute } from './context/AuthContext';
import Upload  from './pages/Upload';
import QuizComponent from './pages/Quiz';
import QuizSuccessModal from './layout/QuizSuccessModal';
import QuizCards from './pages/QuizCard';
import FeedbackQuizModal from './layout/FeedbackQuizModal';
//import Dashboard from './pages/Dashboard';



function App() {
  return (
   <AuthProvider>
    <Routes>
      /* Protected Route: only accessible if authenticated */
      <Route path="/getting-started" element={
        <ProtectedRoute>
          <GettingStarted />
        </ProtectedRoute>
      } 
      />
      <Route path="/uploads" element={
        <ProtectedRoute>
          <Upload />
        </ProtectedRoute>
      }
      />
      <Route path="/quiz" element={
        <ProtectedRoute>
          <QuizComponent />
        </ProtectedRoute>
      }
      />
      <Route path="/start-quiz/:quizId" element={
        <ProtectedRoute>
          <QuizCards />
        </ProtectedRoute>
      }
      />
      /* Public Route: only accessible if not authenticated */
      <Route path="/" element={
        <RedirectIfNOTAuthenticated>
          <LandingPage />
        </RedirectIfNOTAuthenticated>
      }
      />
      <Route path="/login" element={
        <RedirectIfNOTAuthenticated>
          <Login />
        </RedirectIfNOTAuthenticated>
      }
      />
      <Route path="/register" element={
        <RedirectIfNOTAuthenticated>
          <Register />
        </RedirectIfNOTAuthenticated>
      }
     
      />            
      /* Public Route */
      
     
     
      
    </Routes>
   </AuthProvider>
  );
}

export default App;
