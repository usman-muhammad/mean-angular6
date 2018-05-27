const winston = require('winston')
const config = require('./../config/logger')
let logger = new winston.Logger({
  transports: [
    new winston.transports.File(config.options.file),
    new winston.transports.Console(config.options.console)
  ],
  exitOnError: false // do not exit on handled exceptions
})

logger.stream = {
  write: function (message) {
    // use the 'info' log level so the output will be picked up by both transports (file and console)
    logger.info(message)
  }
}

logger.requestLog = (req, res, next) => {
  logger.info('requestUrl : ', req.originalUrl)
  logger.debug('request Body : ', req.body)
  next()
}

module.exports = logger
