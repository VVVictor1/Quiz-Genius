import { generateQuiz } from '../services/quizGeneratorService.js';
import ExtractContent from '../models/Extract_Content.js';
import Quiz from '../models/Quiz.js';
import Question from '../models/Question.js';
import QuizAttempt from '../models/quizAttempts.js';
import sequelize from '../config/db.js';


export const createQuiz = async (req, res) => {
    try {
        const {userId} = req.user;
        const {extractId} = req.body;

        const extractedText = await ExtractContent.findOne({
            where: {
                userId: userId,
                extractId: extractId,
            }
        });

        if(!extractedText){
            return res.status(404).json({message: 'No text extracted for this file'});
        }

        //it will generate a quiz from the extracted text, the output is a JSON object with the (quiz title and questions[questionText, questionType, options, correctAnswer]).
        const quizData = await generateQuiz(extractedText.extractedContent);
        console.log('Generated Quiz:', quizData);

        //It will create 2 tables in the database, one for the quiz and one for the questions.

        const quiz = await Quiz.create({
            userId: userId,
            extractId: extractId,
            quizTitle: quizData.quizTitle,            
            totalQuestions: quizData.questions.length,
        });
        
        const question = quizData.questions.map(questionData => ({
            quizId: quiz.quizId,
            questionText: questionData.questionText,
            questionType: questionData.questionType,
            options: questionData.options,
            correctAnswer: questionData.correctAnswer,
        }));

        await Question.bulkCreate(question);
        res.status(201).json({message: 'Quiz created successfully', quiz, questions: question});
        console.log('Quiz Data:', JSON.stringify(quizData, null, 2));
        console.log('Created Questions:', JSON.stringify(question, null, 2));
        
    }catch(error){
        console.error('Error creating quiz:', error);
        res.status(500).json({message: 'Failed to create quiz'});
    }
}

//display all quizzes created by the user
export const getAllQuiz = async (req,res) => {
    const {userId} = req.user;
    
    try{
        const quiz = await Quiz.findAll({
            where:{
                userId: userId
            }
        })

        const quizData = quiz.map(quiz => ({
            quizId: quiz.quizId,
            quizTitle: quiz.quizTitle,
            totalQuestions: quiz.totalQuestions,
            createdAt: quiz.createdAt,            
        }))

        res.status(200).json(quizData);

    }catch(error){
        console.error('Error getting quiz:', error);
        res.status(500).json({message: 'Failed to get quiz', error: error.message});
    }

}

//display the history of quizzes attempted by the user
export const getQuizHistory = async (req,res) => {
    const {userId} = req.user;

    try{
    
    const quizHistory = await QuizAttempt.findAll({
        where: {
            userId: userId
        },
        attributes:[
            [sequelize.col('QuizAttempt.quizId'), 'quizId'],
            [sequelize.fn('COUNT', sequelize.col('QuizAttempt.quizId')), 'attemptCount'],
            [sequelize.fn('MAX', sequelize.col('QuizAttempt.score')), 'highestScore'],
            [sequelize.fn('MAX', sequelize.col('QuizAttempt.startedAt')), 'lastAttempted'],
        ],     
        include: [{
            model: Quiz,
            attributes: ['quizTitle']
        }],
        group: ['QuizAttempt.quizId','Quiz.quizTitle','Quiz.quizId']
    })

    const quizHistoryData = quizHistory.map(attempt => ({
        quizId: attempt.getDataValue('quizId'),
        quizTitle: attempt.Quiz.quizTitle,
        attemptCount: parseInt(attempt.getDataValue('attemptCount') ),
        highestScore: attempt.getDataValue('highestScore'),
        lastAttempted: attempt.getDataValue('lastAttempted'),
    }))
    console.log("quiz history data",quizHistoryData);
    res.status(200).json(quizHistoryData);

    }catch(error){
        console.error('Error getting quiz history:', error);
        res.status(500).json({message: 'Failed to get quiz history', error: error.message});
    }
}


