const express = require('express')
const passport = require('passport')
require('../auth/passport')(passport)
const router = express.Router()
const { celebrate } = require('celebrate')

const requestValidation = require('./../utils/requestValidationSchemas')
const logger = require('./../utils/logger')

const userCtrl = require('./../controllers/userCtrl')
// {
//   abortEarly: false, // abort after the last validation error
//   allowUnknown: true, // allow unknown keys that will be ignored
//   stripUnknown: true // remove unknown keys from the validated data
// }

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('respond with a resource')
})
router.post('/register', logger.requestLog, celebrate(requestValidation.userRegister), userCtrl.register)
router.post('/signin', logger.requestLog, celebrate(requestValidation.userSignin), (req, res, next) => {
  res.send('respond with a resource')
})

module.exports = router
