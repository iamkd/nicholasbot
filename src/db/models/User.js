import Sequelize from 'sequelize';

export default sequelize =>
  sequelize.define('user', {
    name: {
      type: Sequelize.STRING
    },
    faculty: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null
    },
    telegram: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    facebook: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    },
    message: {
      type: Sequelize.TEXT,
      allowNull: true,
      defaultValue: null
    },
    telegramId: {
      type: Sequelize.STRING,
      allowNull: true,
      defaultValue: null
    }
  });
