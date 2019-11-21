const Sequelize = require('sequelize')
const sequelize = require('../config/DBConfig')
const Report = sequelize.define('appointments', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'appointments',
      key: 'id',
    }
  },
  diagnosis: Sequelize.TEXT,
  treatment: Sequelize.TEXT,
  comment: Sequelize.TEXT
}, {
  timestamps: false,
  modelName: 'reports'
});

module.exports = Report