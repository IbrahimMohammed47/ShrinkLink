const express = require('express')
const router = express.Router()
const stripe = require('stripe')(process.env.STRIPESECRET);

const { Patient, Doctor, Report } = require('../models/')
const { verifyToken } = require('../middleware/auth')
const NotifyEmail = require('../middleware/notification')


let weekday = new Array(7);
weekday[0] = "Monday";
weekday[1] = "Tuesday";
weekday[2] = "Wednesday";
weekday[3] = "Thursday";
weekday[4] = "Friday";
weekday[5] = "Saturday";
weekday[6] = "Sunday";

router.post('/book', verifyToken, async (req, res) => {
  try {
    console.log(req.userId)
    let patient = await Patient.findByPk(req.userId);
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

    let slot = req.body.slot
    let docId = req.body.doctor_id
    if (!slot) return res.status(300).send("You need to choose a slot")
    if (!docId) return res.status(400).send("doctor not chosen")

    let doctor = await Doctor.findByPk(docId, { attributes: ['id', 'email', 'slots'] })
    let docSchedule = doctor.slots
    if (docSchedule[slot] === 'true' || docSchedule[slot] === true) {
      docSchedule[slot] = 'false'
      doctor = Object.assign(doctor, { slots: docSchedule });
      await doctor.save();

      let reports = Report.findAll({ where: { patient_id: req.userId } }) || []
      let reportsString = ''
      reports.forEach(report => {
        reportsString += "diagnosis:" + report.diagnosis + "\ntreatment" + report.treatment + "\ncomment" + report.comment
      });
      let dayHour = slot.split("-");
      let day = weekday[parseInt(dayHour[0])];
      let hour = dayHour[1];
      await NotifyEmail(doctor.email, "Patient appointment reservation",
        `${patient.firstName} will visit you on ${day} at ${hour}:00 \n
        , you can call hom on ${patient.mobileNumber}
        ================================================
        ${reportsString}
        `
      )

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
