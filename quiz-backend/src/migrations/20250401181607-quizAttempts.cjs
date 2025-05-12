'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('QuizAttempt', {
      attemptId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
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
      quizId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Quiz',
          key: 'quizId',
        },
        onDelete: 'CASCADE',
      },
      score: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      startedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      completedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('QuizAttempt');
  }
};
