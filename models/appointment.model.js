const Sequelize = require('sequelize')
const sequelize = require('../config/DBConfig')
const Appointment = sequelize.define('appointments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  doctor_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'doctors',
      key: 'id',
    }
  },
  patient_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'patients',
      key: 'id',
    }
  }

}, {
  timestamps: false,
  modelName: 'appointments'
});

module.exports = Appointment