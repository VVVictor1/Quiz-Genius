import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Quiz = sequelize.define('Quiz',{
    quizId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'userId',
        },
        
    },
    extractId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'ExtractContent',
            key: 'extractId',
        },
        
    },
    quizTitle: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    totalQuestions: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },    
},
{
    tableName: 'Quiz',
    timestamps: false,
});

export default Quiz;


