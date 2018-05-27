const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String
  },
  email: {
    type: String
  }
})

UserSchema.pre('save', function (next) {
  var user = this
  if (this.isModified('password') || this.isNew) {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        return next(err)
      }
      bcrypt.hash(user.password, salt, null, (err, hash) => {
        if (err) {
          return next(err)
        }
        user.password = hash
        next()
      })
    })
  } else {
    return next()
  }
})

UserSchema.methods.comparePassword = function (passw, cb) {
  bcrypt.compare(passw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err)
    }
    cb(null, isMatch)
  })
}
const User = module.exports = mongoose.model('User', UserSchema, 'users')

// methods
module.exports.addUser = (newUser) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await newUser.save()
      resolve(user)
    } catch (err) {
      reject(err)
    }
  })
}

module.exports.getUserByNameOrEmail = (nameOrEmail) => {
  return new Promise(async (resolve, reject) => {
    try {
      let query = { $or: [{ username: nameOrEmail }, { email: nameOrEmail }] }
      const user = await User.findOne(query)
      resolve(user)
    } catch (err) {
      reject(err)
    }
  })
}
