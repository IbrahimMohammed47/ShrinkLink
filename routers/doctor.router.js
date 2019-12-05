const express = require('express')
const bcrypt = require('bcryptjs');
const router = express.Router()

const { Doctor, Rating, Report } = require('../models/')

const { login, verifyToken } = require('../middleware/auth')

router.post('/login', login(Doctor))

router.post('/report', async (req, res) => {
  try {
    let report = await Report.create({
      id: req.body.id,
      patient_id: req.body.patient_id,
      diagnosis: req.body.diagnosis,
      treatment: req.body.treatment,
      comment: req.body.comment
    })
    res.send(`report created with id ${report.id}`)
  } catch (error) {
    console.log(error);
    res.send("something wrong")
  }
})



router.post('/create', async (req, res) => {
  try {
    let doctor = await Doctor.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      specialization: req.body.specialization,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      mobileNumber: req.body.mobileNumber,
      rating: req.body.rating,
      place: req.body.place,
      slots: req.body.slots,
      certificates: req.body.certificates
    })
    res.send(`doctor created with id ${doctor.id}`)
  } catch (error) {
    console.log(error);
    res.send("something wrong");
  }
})


router.put('/edit/:id', verifyToken, async (req, res) => {
  try {
    doctor = await Doctor.findByPk(req.params.id);
    doctor = Object.assign(doctor, req.body);
    doctor.save();
    res.send(`doctor is updated`)
  } catch (error) {
    console.log(error)
    res.send("something wrong");
  }
})

router.get('/list', async (req, res) => {
  try {
    let doctors = await Doctor.findAll({
      attributes: ['id', 'firstName', 'lastName', 'specialization', 'rating', 'place']
    });
    res.json(doctors);
  } catch (error) {
    console.log(error);
    res.send("something wrong");
  }
})

router.get('/view/:id', async (req, res) => {
  try {
    let doctor = await Doctor.findByPk(
      req.params.id,
      { attributes: ['id', 'firstName', 'lastName', 'specialization', 'mobileNumber', 'rating', 'place', 'slots', 'certificates'] }
    );
    res.json(doctor);
  } catch (error) {
    console.log(error)
    res.send("something wrong");
  }
})

router.put('/rate', verifyToken, async (req, res) => {
  try {
    let docId = req.body.doctor_id
    let newRating = req.body.rating
    await Rating.create({
      rating: newRating,
      doctor_id: docId
    })
    let ratingsCount = await Rating.count({
      where: { doctor_id: docId },
    })
    let doctor = await Doctor.findByPk(docId)
    doctor.rating = ((newRating + doctor.rating) / ratingsCount);
    await doctor.save();

    res.send(`doctor rate is now ${doctor.rating}`)
  } catch (error) {
    console.log(error)
    res.send("something wrong");
  }
})


module.exports = router

