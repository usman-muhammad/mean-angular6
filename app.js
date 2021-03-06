const createError = require('http-errors')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const passport = require('passport')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const { errors } = require('celebrate')

const config = require('./app/config/database')
const logger = require('./app/utils/logger')
const app = express()
app.use(cors())
// view engine setup
// View engine
app.set('view engine', 'html')
app.set('views', 'public')

app.use(passport.initialize())
app.use(passport.session())
require('./app/auth/passport')(passport)
app.use(morgan('dev', { stream: logger.stream }))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(bodyParser.json())
// app.use(express.static(path.join(__dirname, 'public')))

mongoose.Promise = require('bluebird')
mongoose.connect(config.database, { promiseLibrary: require('bluebird') })
  .then(async () => {
    console.log('connect to db')
    const joiPrettyErrorsMessages = require('./app/utils/joiPrettyErrorsMessages')
    const angularRouter = require('./app/routes/angular')
    const usersRouter = require('./app/routes/users')

    app.use('/', angularRouter)
    app.use('/api/v1/users', usersRouter)

    // catch 404 and forward to error handler
    app.use((req, res, next) => {
      console.log('404 Errors')
      next(createError(404))
    })
    // error handler
    app.use(async (err, req, res, next) => {
      // set locals, only providing error in development
      res.locals.message = err.message
      res.locals.error = req.app.get('env') === 'development' ? err : {}
      // Check validation error form JOi
      if (err.isJoi) {
        return res.status(400).json(await joiPrettyErrorsMessages(err))
      }
      // render the error page
      res.status(err.status || 500)
      console.log(res.status)
      res.render('error')
    })
    app.use(errors())
  }).catch((err) => console.error(err))
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'))
// })
module.exports = app
