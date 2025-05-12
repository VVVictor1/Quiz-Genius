import express from 'express';
import {createQuiz, getAllQuiz, getQuizHistory} from '../controllers/quizController.js';
import { authenticateUser } from '../middleware/authMiddleware.js';
import { submitFinalQuiz } from '../controllers/quizSocketController.js';
const router = express.Router();

//router.post('/:fileId', authenticateUser, createQuiz);
router.post('/generate', authenticateUser, createQuiz);
router.get('/getAllQuiz', authenticateUser, getAllQuiz);
router.get('/getQuizHistory', authenticateUser, getQuizHistory);
router.post('/submit', authenticateUser, submitFinalQuiz);
export default router;
