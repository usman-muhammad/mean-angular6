const _ = require('lodash')
module.exports = (errors, useJoiError = true) => {
  // useJoiError determines if we should respond with the base Joi error
  // boolean: defaults to true
  const _useJoiError = _.isBoolean(useJoiError) && useJoiError
  // Validate req.body using the schema and validation options
  const JoiError = {
    error: {
      original: errors._object,
      // fetch only message and type from each error
      details: _.map(errors.details, ({message, type}) => ({
        message: message.replace(/['"]/g, ''),
        type
      }))
    }
  }
  // Custom Error
  const CustomError = {
    status: 'failed',
    error: 'Invalid request data. Please review request and try again.'
  }
  // Return joi error
  return _useJoiError ? JoiError : CustomError
}
