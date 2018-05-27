
const User = require('./../models/user')

module.exports.register = async (req, res) => {
  try {
    let user = new User(req.body)
    let result = await User.addUser(user)
    res.send({success: true, message: 'User created successfully ', data: result})
  } catch (err) {
    console.log(err);
    res.send({success: false, message: 'Error ', data: err})
  }
}
