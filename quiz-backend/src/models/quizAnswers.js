import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const QuizAnswer = sequelize.define('QuizAnswer',{
    answerId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    attemptId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'QuizAttempt',
            key: 'attemptId',
        }
    },
    questionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Question',
            key: 'questionId',
        }
    },
    userAnswer: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isCorrect: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    }
    

},
{
    tableName: 'QuizAnswer',
    timestamps: false,
})

export default QuizAnswer;

