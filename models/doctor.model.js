const Sequelize = require('sequelize')
const sequelize = require('../config/DBConfig')
const Doctor = sequelize.define('doctors', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  },
  specialization: { type: Sequelize.STRING },
  email: { type: Sequelize.STRING, unique: true },
  mobileNumber: { type: Sequelize.STRING, unique: true },
  rating: { type: Sequelize.DOUBLE, default: 0.0 },
  place: { type: Sequelize.STRING },
  slots: { type: Sequelize.JSON },
  certificates: { type: Sequelize.ARRAY(Sequelize.TEXT) },
}, {
  timestamps: false,
  modelName: 'doctors'
});

module.exports = Doctor