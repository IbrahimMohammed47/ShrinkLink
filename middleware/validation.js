const Joi = require('@hapi/joi');

const DoctorSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30),
  specialization: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[A-Za-z0-9]{3,30}$/).required(),
  mobileNumber: Joi.string().alphanum().min(3).max(30),
  place: Joi.string().min(3).max(50),
});


const PatientSchema = Joi.object().keys({
  firstName: Joi.string().alphanum().min(3).max(30).required(),
  lastName: Joi.string().alphanum().min(3).max(30),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^[A-Za-z0-9]{3,30}$/).required(),
  mobileNumber: Joi.string().alphanum().min(3).max(30),
  age: Joi.number().min(8).max(100).required(),
  gender: Joi.string().valid("male", "female").required()
});

const validate = (schema) => (obj) => {
  const { error, value } = schema.validate(obj);
  if (error) {
    throw Error("validation error" + error)
  }
}

module.exports = {
  validateDoctor: validate(DoctorSchema),
  validatePatient: validate(PatientSchema),
}