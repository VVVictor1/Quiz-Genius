'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.createTable('Quiz', {
        quizId: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: 'User',
            key: 'userId',
          },
          onDelete: 'CASCADE',
        },
        extractId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
           model: 'ExtractContent',
           key: 'extractId',
          },
          onDelete: 'CASCADE',
        },
        quizTitle: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        totalQuestions: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW,
        },
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Quiz');
  }
};
