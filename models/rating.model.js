const Sequelize = require('sequelize')
const sequelize = require('../config/DBConfig')
const Rating = sequelize.define('ratings', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  rating: { type: Sequelize.DOUBLE, default: 0.0 },
  doctor_id: {
    type: Sequelize.INTEGER,
    references: {
      model: 'doctors',
      key: 'id',
    }
  }
}, {
  timestamps: false,
  modelName: 'ratings'
});

module.exports = Rating