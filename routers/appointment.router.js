const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPESECRET);

const { Appointment, Patient } = require('../models/')
const { verifyToken } = require('../middleware/auth')

router.post('/book', verifyToken, async (req, res) => {
  try {
    patient = await Patient.findByPk(req.body.patient_id);
    patient_stripe_id = patient.stripe_id
    stripe.invoiceItems.create({
      customer: patient_stripe_id,
      amount: 10000,
      currency: 'usd',
      description: 'shay belyasmin',
    }, function (err, invoiceItem) {
      // asynchronously called
      stripe.invoices.create({
        customer: patient_stripe_id,
        auto_advance: true, // auto-finalize this draft after ~1 hour
      }, function (err, invoice) {

      });
    });
    let appointment = await Appointment.create({
      date: req.body.date,
      patient_id: req.body.doctor_id,
      doctor_id: req.body.patient_id

    })
    res.send(`appointment created with id ${appointment.id}`)
  } catch (error) {
    console.log(error);
    res.status(405).send("something wrong");
  }
})
module.exports = router
