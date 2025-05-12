'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Question', {
      questionId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      questionText: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      questionType: {
        type: Sequelize.ENUM('mcq', 'true_false'),
        allowNull: false,
      },
      options: {
        type: Sequelize.JSONB,
        allowNull: true,
      },
      correctAnswer: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Question');
  }
};
