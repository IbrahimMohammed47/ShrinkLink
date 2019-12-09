const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPESECRET);

const { Appointment, Patient, Doctor } = require('../models/')
const { verifyToken } = require('../middleware/auth')



router.post('/book', verifyToken, async (req, res) => {
  try {
    let patient = await Patient.findByPk(req.body.patient_id);
    let patient_stripe_id = patient.stripe_id
    await stripe.invoiceItems.create({
      customer: patient_stripe_id,
      amount: 10000,
      currency: 'usd',
      description: 'shay belyasmin',
    }, function (err, invoiceItem) {
      stripe.invoices.create({
        customer: patient_stripe_id,
        auto_advance: true, // auto-finalize this draft after ~1 hour
      }, function (err, invoice) {

      });
    });
    // let appointment = await Appointment.create({
    //   date: req.body.date,
    //   patient_id: req.body.doctor_id,
    //   doctor_id: req.body.patient_id
    // })
    // res.send(`appointment created with id ${appointment.id}`)
    let slot = req.body.slot
    let docId = req.body.doctor_id
    if (!slot) return res.status(300).send("You need to choose a slot")
    if (!docId) return res.status(400).send("doctor not chosen")

    let doctor = await Doctor.findByPk(docId, { attributes: ['id', 'slots'] })
    let docSchedule = doctor.slots
    if (docSchedule[slot] === 'true' || docSchedule[slot] === true) {
      docSchedule[slot] = 'false'
      doctor = Object.assign(doctor, { slots: docSchedule });
      await doctor.save();
      return res.send("an email will be sent to you shortly to complete the transaction")
    }
    else {
      return res.status(400).send("slot isn't available")
    }
  } catch (error) {
    console.log(error);
    res.status(405).send("something wrong");
  }
})
module.exports = router
