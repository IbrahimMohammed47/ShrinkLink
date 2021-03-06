const Sequelize = require('sequelize')
const sequelize = require('../config/DBConfig')
const Patient = sequelize.define('patients', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  stripe_id:
  {
    type: Sequelize.STRING,
    unique: true
  }
  ,
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: { type: Sequelize.STRING, unique: true },
  mobileNumber: { type: Sequelize.STRING, unique: true },
  age: { type: Sequelize.INTEGER },
  gender: { type: Sequelize.ENUM('male', 'female') }
}, {
  timestamps: false,
  modelName: 'patients',
  alter: false,

});

module.exports = Patient