const sequelize = require('../config/DBConfig')
const Doctor = require('./doctor.model')
const Patient = require('./patient.model')
const Appointment = require('./appointment.model')
const Report = require('./report.model')
const Rating = require('./rating.model')

sequelize.sync({ force: false })
  .then(() => {
    console.log(`tables are successfully synced! 🚀`)
  })
module.exports = {
  Doctor,
  Patient,
  Appointment,
  Report,
  Rating
}