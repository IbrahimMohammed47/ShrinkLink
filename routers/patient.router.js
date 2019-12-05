const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router()

const { Patient, Report } = require('../models/')
const stripe = require('stripe')('sk_test_Aqa9dsgiQPVXBfyw9fTgJA5h00LK5cUlKs');
router.post('/create', async (req, res) => {
  try {

    const customer = await stripe.customers.create({
      name: req.body.firstName + " " + req.body.lastName,
      email: req.body.email,
      description: 'sapry dummy description'
    });



    let patient = await Patient.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      mobileNumber: req.body.mobileNumber,
      age: req.body.age,
      gender: req.body.gender,
      stripe_id: customer.id,
    })
    res.send(`patient created with id ${patient.id}`)
  } catch (error) {
    console.log(error);
    res.send("something wrong");
  }
})

router.get('/history/:id', async (req, res) => {
  try {
    let reports = await Report.findAll({
      attributes: ['patient_id', 'diagnosis', 'treatment', 'comment']
      , where: { patient_id: req.params.id }
    });
    res.json(reports);
  } catch (error) {
    console.log(error);
    res.send("something wrong");
  }
})


module.exports = router
