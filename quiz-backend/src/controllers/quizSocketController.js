import Question from '../models/Question.js';
import QuizAttempt from '../models/quizAttempts.js';
import QuizAnswer from '../models/quizAnswers.js';
import sequelize from 'sequelize';


export const startQuiz = async (quizID) => {
        try{
            const questions = await Question.findAll({
                where: {
                    quizId: quizID,
                }
            })
            if(!questions){
               throw new Error('No questions found for this quiz');
            }
            //create a quiz object
            const quizData = {
                Questions: questions.map(question => ({                 
                    questionId: question.questionId,
                    questionText: question.questionText,
                    questionType: question.questionType,
                    options: question.options,
                })),
            };
            return quizData;
        }catch(error){
            console.error('Error fetching quiz data:', error);
            
        }
    }

 export const  validateAnswer = async (userAnswer,questionId) => {
        try{
            const questions = await Question.findOne({
                where: {
                    questionId: questionId,
                }
            })
            if(!questions){
                return Response.status(404).json({message: 'No questions found for this quiz'});
            }
            const isCorrect = questions.correctAnswer === userAnswer;
            return {
                isCorrect: isCorrect,
                correctAnswer: questions.correctAnswer,
                questionId: questionId
            }
        }catch(error){
            console.error('Error validating answer:', error);
            
        }        
    }
export const submitFinalQuiz = async(req,res) =>{
    const userId = req.user.userId;
    const {quizId,answers} = req.body;
    try{
            const resultScore = await calculateScore(quizId,answers);
            const createdQuizAttempt = await QuizAttempt.create({
            userId: userId,
            quizId: quizId,
            score: resultScore.percentage,
            startedAt: new Date(),
            completedAt: new Date(),
         });
         const quizAttemptId = createdQuizAttempt.attemptId;

         const quizAnswers = answers.map(answer => ({
            attemptId: quizAttemptId,
            questionId: answer.questionId,
            userAnswer: answer.userAnswer,
            isCorrect: answer.isCorrect,
         }));
         await QuizAnswer.bulkCreate(quizAnswers);
         return res.status(200).json({message: 'Quiz submitted successfully',resultScore});           
    }catch(error){
        console.error('Error submitting final quiz:', error);     
    }
}

export const calculateScore = async(quizId,answers) =>{
    try{
        const quizAttempt = await Question.findAll({
            where: {
                quizId: quizId,
            }
                     
        });
            if(!quizAttempt){
                throw new Error('No quiz attempts found');
            }
            const correctAnswers = quizAttempt.reduce((total,question) =>{
                const answer = answers.find(a => a.questionId === question.questionId);
                return total + (answer.isCorrect ? 1 : 0);
            },0);
            const totalQuestions = quizAttempt.length;
            const incorrectAnswers = totalQuestions - correctAnswers;
            const percentage = Math.round((correctAnswers/totalQuestions)*100);
            
            const result = {
                percentage: percentage,
                incorrectAnswers: incorrectAnswers,
                correctAnswers: correctAnswers,
                totalQuestions: totalQuestions,
                timeTaken: new Date(),
            }
            return result;
    }catch(error){
        console.error('Error calculating score:', error);        
    }
}

