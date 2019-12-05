require('dotenv').config()
const express = require('express')
const cors = require('cors')
const routers = require('./routers')

const sequelize = require('./config/DBConfig')
sequelize
  .authenticate()
  .then(() => {
    console.log('ShrinkLink connected to DB 💃 .')
    require('./models')
  })
  .catch((e) => {
    console.log('ShrinkLink couldn\'t connect to DB 😳 .')
    console.log(e)
  })

// Init middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cors())
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use('/api/doctors', routers.doctors)
app.use('/api/patients', routers.patients)
app.use('/api/appointments', routers.appointments)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`ShrinkLink running on port ${port} 👍 .`)
})