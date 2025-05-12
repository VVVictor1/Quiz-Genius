import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const User = sequelize.define(
  'User',
  {
    id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true, 
      field: 'userId' 
    },
    firstName: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      field: 'FirstName' 
    },
    lastName: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      field: 'SecondName' 
    },
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true, 
      field: 'email' 
    },
    password: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      field: 'password'
    },
    googleId: { 
      type: DataTypes.STRING, 
      allowNull: true, 
      field: 'googleID' 
    },
    createdAt: { 
      type: DataTypes.DATE, 
      allowNull: false, 
      defaultValue: DataTypes.NOW, 
      field: 'Created' 
    }
  },
  {
    tableName: 'User',
    timestamps: false, 
  }
);

export default User;

