import sequelize from "../config/db.js";
import { DataTypes } from "sequelize";

const QuizAttempt = sequelize.define('QuizAttempt',{
    attemptId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'userId',
        }
    },
    quizId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
           model: 'Quiz',
           key: 'quizId',
        }
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    startedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },    
       
    completedAt: {
        type: DataTypes.DATE, 
        allowNull: true,        
    }
  
},
{
    tableName: 'QuizAttempt',
    timestamps: false,
})

export default QuizAttempt;
