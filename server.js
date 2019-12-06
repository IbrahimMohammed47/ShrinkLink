require('dotenv').config()
const express = require('express')
const routers = require('./routers')
const path = require('path');
const public = path.join(__dirname, 'client');



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
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS,PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});


app.use(express.static('client'))

// app.use(express.static(__di`rname + '/client')); // Current directory is root
// app.get('/', function (req, res) {
//   res.sendFile(path.join(public, 'index.html'));
// });
//Serves all the request which includes /images in the url from Images folder
// app.use('/views', express.static(__dirname + '/client/views'));
// app.use('/assets', express.static(__dirname + '/client/assets'));
// app.use('/viewmodels', express.static(__dirname + '/client/viewmodels'));

app.use('/api/doctors', routers.doctors)
app.use('/api/patients', routers.patients)
app.use('/api/appointments', routers.appointments)

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`ShrinkLink running on port ${port} 👍 .`)
})