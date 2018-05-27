'use strict'
const appRoot = require('app-root-path')
module.exports = {
  options: {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      colorize: false
    },
    console: {
      level: 'debug',
      handleExceptions: true,
      json: false,
      colorize: true
    }
  }
}
