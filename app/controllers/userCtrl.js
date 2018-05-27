
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
      if (!user) return res.json({ success: false, message: 'Authentication failed. User not found...!!!' })
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch && !err) {
          const token = jwt.sign(user.toJSON(), config.secret)
          user = { _id: user._id, name: user.name, email: user.email, username: user.username }
          return res.json({ success: true, msg: 'Login Successfully...!!!', token: 'JWT ' + token, user: user })
        } else {
          return res.json({ success: false, msg: 'Authentication failed. Wrong password...!!!' })
        }
      })
    } catch (err) {
      logger.error(err)
      res.send({success: false, message: 'Error ', data: err})
    }
  },
  profile: async (req, res) => {
    let user = { _id: req.user._id, name: req.user.name, email: req.user.email, username: req.user.username }
    return res.json(user)
  }
}
