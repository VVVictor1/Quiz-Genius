import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Question = sequelize.define('Question',{
    questionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Quiz',
            key: 'quizId',
        },
        
    },
    questionText: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    questionType: {
        type: DataTypes.ENUM('mcq', 'true_false'),
        allowNull: false,
    },
    options: {
        type: DataTypes.JSONB,//array of objects only for mcq
        allowNull: true,
    },
    correctAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
    },   
},
{
    tableName: 'Question',
    timestamps: false,
});

export default Question;

