'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('ExtractContent',{
      extractId: {
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
      fileName: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      fileType: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['pdf', 'docx', 'doc', 'txt']],
        },
      },
      filePath: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      size: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      uploadedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      expiresAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP + INTERVAL '7 day'") 
      },
      extractedContent: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
          len: [1, 1048576], //1MB
        },
      },
  },
)},
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('ExtractContent');
  }
};
