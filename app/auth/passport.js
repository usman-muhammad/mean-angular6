const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// load up the user model
const User = require('./../models/user')
const config = require('./../config/database') // get db config file

module.exports = (passport) => {
  const opts = {}
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
  opts.secretOrKey = config.secret
  passport.use(new JwtStrategy(opts, (jwtPayload, done) => {
    User.findOne({id: jwtPayload.id}, (err, user) => {
      if (err) {
        return done(err, false)
      }
      if (user) {
        done(null, user)
      } else {
        done(null, false)
      }
    })
  }))
}
