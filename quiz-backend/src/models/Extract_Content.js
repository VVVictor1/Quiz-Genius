import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const ExtractContent = sequelize.define('ExtractContent',{
    extractId: {
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
    fileName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    fileType: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate: {
            isIn: [['pdf', 'docx','doc', 'txt']],
        }
    },
    filePath: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    
    uploadedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: () => {
            const now = new Date();
            now.setDate(now.getDate() + 7); // in 7 days the file will be deleted
            return now;
        }
    },
    extractedContent: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            len: [1, 1048576],//1MB
        }
    },
},
{
    tableName: 'ExtractContent',
    timestamps: false,
});

export default ExtractContent;
