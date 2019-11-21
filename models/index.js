const sequelize = require('../config/DBConfig')
const doctors = require('./doctor.model')
const patients = require('./patient.model')
const appointments = require('./appointment.model')
const reports = require('./report.model')
sequelize.sync({ force: false })
  .then(() => {
    console.log(`tables are successfully synced! 🚀`)
  })
module.exports = {
  doctors,
  patients,
  appointments,
  reports
}