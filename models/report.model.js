const Sequelize = require('sequelize')
const sequelize = require('../config/DBConfig')
const Report = sequelize.define('reports', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    references: {
      model: 'appointments',
      key: 'id',
    }
  },
  patient_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'patients',
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