const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPESECRET);

const { Patient, Report } = require('../models/')
const { login, verifyToken } = require('../middleware/auth')
const { validatePatient } = require('../middleware/validation')


router.post('/login', login(Patient))

router.post('/create', async (req, res) => {
  try {
    let patient = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      mobileNumber: req.body.mobileNumber,
      age: req.body.age,
      gender: req.body.gender,
    }

    const customer = await stripe.customers.create({
      name: patient.firstName + " " + patient.lastName,
      email: patient.email,
      description: 'sapry dummy description'
    });

    validatePatient(patient)
    patient.stripe_id = customer.id
    patient.password = bcrypt.hashSync(patient.password, 8)

    patient = await Patient.create(patient)
    res.send(`patient created with id ${patient.id}`)
  } catch (error) {
    console.log(error);
    res.status(405).send("something wrong");
  }
})

router.get('/history/:id', verifyToken, async (req, res) => {
  try {
    let reports = await Report.findAll({
      attributes: ['patient_id', 'diagnosis', 'treatment', 'comment']
      , where: { patient_id: req.params.id }
    });
    res.json(reports);
  } catch (error) {
    console.log(error);
    res.status(405).send("something wrong");
  }
})


module.exports = router
