const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router()

const { Patient } = require('../models/')
router.post('/register', async (req, res) => {

  try {
    let patient = await Patient.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      mobileNumber: req.body.mobileNumber,
      age: req.body.age,
      gender: req.body.gender,
    })
    res.send(`patient created with id ${patient.id}`)
  } catch (error) {
    console.log(error);
    res.send("something wrong");
  }
})

module.exports = router
