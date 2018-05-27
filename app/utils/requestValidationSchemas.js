const Joi = require('joi')

module.exports = {
  userRegister: {
    body: {
      email: Joi.string().required(),
      name: Joi.string().required(),
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },
  userLogin: {
    body: Joi.object().keys({
      username: Joi.string(),
      email: Joi.string().email(),
      password: Joi.string().min(2).max(200).required()
    }).xor('username', 'email')
  }

  // query: {
  //   name: Joi.string().required()
  // },
  // body: {
  //     age: Joi.number().required(),
  //     company: Joi.object({
  //         name: Joi.string().required(),
  //         role: Joi.string().required().valid('HR', 'Technical') //enum style validation
  //     }).required()
  // },
  // params: {
  //     id: Joi.number().required()
  // },
  // headers: {
  //     'user-agent': Joi.string().required()
  //   }
}
