'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('QuizAnswer', {
      answerId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      attemptId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'QuizAttempt',
          key: 'attemptId',
        },
        onDelete: 'CASCADE',
      },
      questionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Question',
          key: 'questionId',
        },
        onDelete: 'CASCADE',
      },
      userAnswer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      isCorrect: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('QuizAnswer');
  }
};
