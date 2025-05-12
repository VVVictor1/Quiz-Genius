import ExtractContent from './Extract_Content.js';
import Quiz from './Quiz.js';
import Question from './Question.js';
import User from './User.js';
import QuizAttempt from './quizAttempts.js';
import QuizAnswer from './quizAnswers.js';


// Associations

// User to ExtractContent
User.hasMany(ExtractContent, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

ExtractContent.belongsTo(User, {
    foreignKey: 'userId',    
});

// User to Quiz
User.hasMany(Quiz, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

Quiz.belongsTo(User, {
    foreignKey: 'userId',
});

// Quiz to ExtractContent
ExtractContent.hasMany(Quiz, {
    foreignKey: 'extractId',
    onDelete: 'CASCADE',
});

Quiz.belongsTo(ExtractContent, {
    foreignKey: 'extractId',
});

// Quiz to Question
Quiz.hasMany(Question, {
    foreignKey: 'quizId',
    onDelete: 'CASCADE',
});

Question.belongsTo(Quiz, {
    foreignKey: 'quizId',
});

// Quiz to QuizAttempt
Quiz.hasMany(QuizAttempt, {
    foreignKey: 'quizId',
    onDelete: 'CASCADE',
});

QuizAttempt.belongsTo(Quiz, {
    foreignKey: 'quizId',
});

// User to QuizAttempt
User.hasMany(QuizAttempt, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
});

QuizAttempt.belongsTo(User, {
    foreignKey: 'userId',
});

// QuizAttempt to QuizAnswer
QuizAttempt.hasMany(QuizAnswer, {
    foreignKey: 'attemptId',
    onDelete: 'CASCADE',
});

QuizAnswer.belongsTo(QuizAttempt, {
    foreignKey: 'attemptId',
});

// QuizAnswer to Question
Question.hasMany(QuizAnswer, {
    foreignKey: 'questionId',
    onDelete: 'CASCADE',
});

QuizAnswer.belongsTo(Question, {
    foreignKey: 'questionId',
});


export default {
    User,
    ExtractContent,
    Quiz,
    Question,
    QuizAttempt,
    QuizAnswer,
};
