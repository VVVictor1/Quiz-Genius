'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('User',{
    userId: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    SecondName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,  
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    googleID: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Created:{
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.NOW
    }

   });
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.dropTable('User');
  }
};
