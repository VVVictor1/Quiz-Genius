import { startQuiz, validateAnswer } from '../controllers/quizSocketController.js';

//set up socket connection
export const setupSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('User connected');
        
        //receive quiz generation request
       socket.on('start_quiz', async (quizID) =>{
    
        //get quiz data from Controller
        const quizData = await startQuiz(quizID);
        //send quiz data to client
        socket.emit('quiz_data', quizData);
        });
    
        //receive user answer
        socket.on('answer', async (userAnswer,questionId) => {
            //validate answer
            const isCorrect = await validateAnswer(userAnswer,questionId);
            //send result to client
            socket.emit('result', isCorrect);
        })
        
        socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });
} 