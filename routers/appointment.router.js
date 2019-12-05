const express = require('express')
const router = express.Router()
const { Appointment } = require('../models/')



router.post('/create', async (req, res) => {
  try {
    let d = new Date()
    let appointment = await Appointment.create({
      date: d,
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
