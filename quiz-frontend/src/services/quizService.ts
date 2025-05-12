import {io, Socket} from 'socket.io-client';
import { config } from '../config';

const API_URL = `${config.API_URL}/api/quiz`;

export const getAllQuiz = async (token: string) => {

    try{
        const response = await fetch(`${API_URL}/getAllQuiz`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch quiz');
        }

        return await response.json();
        
    }catch(error){
        console.error('Error fetching quiz:', error);
        throw error;
    }
}

export const getQuizHistory = async (token: string) => {
    try{
        const response = await fetch(`${API_URL}/getQuizHistory`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            const error = await response.json();
            throw new Error(error.message || 'Failed to fetch quiz history');
        }
        return await response.json();
        
    }catch(error){
        console.error('Error fetching quiz history:', error);
        throw error;
    }
}

export interface Question {
    questionId: number;
    questionText: string;
    questionType: string;
    options: string[];
  }
  
  export interface QuizData {
    Questions: Question[];
  }
  
  export interface AnswerResult {
    isCorrect: boolean;
    correctAnswer: string;
    questionId: number;
  }
  

const socket = io(config.API_URL, {
    transports: ['websocket'],
    withCredentials: true,
    query: {
        token: localStorage.getItem('token')
    }
});

// START the quiz
export const startQuiz = (quizId: number) => {
    socket.emit('start_quiz', quizId);
  };
  
  // Get quiz data
  export const onQuizData = (callback: (quizData: QuizData) => void) => {
    socket.on('quiz_data', callback);
  };
  
  // SEND answer
  export const sendAnswer = (userAnswer: string, questionId: number) => {
    socket.emit('answer', userAnswer, questionId);
  };
  
  // LISTEN for answer validation
  export const onResult = (callback: (result: AnswerResult) => void) => {
    socket.on('result', callback);
  };

  export const submitFinalQuiz = async (token: string, quizId: number, answers: any[]) => {  
    const response = await fetch(`${API_URL}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
        body: JSON.stringify({ quizId, answers }),
    });
    if(!response.ok){
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit quiz');
    }
    return await response.json();
  };
  
  
  export default socket;