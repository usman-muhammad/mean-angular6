
const jwt = require('jsonwebtoken')

const User = require('./../models/user')
const logger = require('./../utils/logger')
const config = require('./../config/database')

module.exports = {
  register: async (req, res) => {
    try {
      let user = new User(req.body)
      await User.addUser(user)
      return res.send({success: true, message: 'User created successfully '})
    } catch (err) {
      logger.error(err)
      return res.send({success: false, message: 'Error ', data: err})
    }
  },
  login: async (req, res) => {
    try {
      let user = await User.getUserByNameOrEmail(req.body.username || req.body.email)
      if (!user) return res.json({success: false, message: 'Authentication failed. User not found...!!!'})
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(user.toJSON(), config.secret)
          res.json({success: true, msg: 'Login Successfully...!!!', token: token})
        } else {
          res.json({success: false, msg: 'Authentication failed. Wrong password...!!!'})
        }
      })
    } catch (err) {
      logger.error(err)
      res.send({success: false, message: 'Error ', data: err})
    }
  }
}
