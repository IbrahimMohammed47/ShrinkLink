const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
  host: process.env.PGHOST,
  dialect: 'postgres',
  // pool configuration used to pool database connections
  pool: {
    max: 5,
    idle: 30000,
    acquire: 60000,
  },
});

module.exports = sequelize