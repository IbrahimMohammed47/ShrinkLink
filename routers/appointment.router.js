const express = require('express')
const router = express.Router()
const { Appointment, Patient } = require('../models/')
const stripe = require('stripe')('sk_test_Aqa9dsgiQPVXBfyw9fTgJA5h00LK5cUlKs');



router.post('/create', async (req, res) => {
  try {

    patient = await Patient.findByPk(req.body.patient_id);
    patient_stripe_id = patient.stripe_id
    console.log(patient.stripe_id)
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
    res.send("something wrong");
  }
})
module.exports = router
