const User = require("./../models/userModel");
const jwt = require('jsonwebtoken');


const signToken = id => {
  return jwt.sign({id}, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

exports.signup = async(req, res) => {
  try {
    const data = await User.create(req.body);

    res.status(201).json({
      status: 'success',
      data: data
    })
  } catch(error) {
    res.status(400).json({
      status: 'failed',
      error
    })
  }
};




exports.login = async(req, res) => {
  try {
    const {email, password } = req.body;
    if(!email || !password) {
      res.status(400).json({
        message: 'Please provide proper login creadential',
        status: 'fail'
      })
    }
    const user = await User.findOne({email}).select('+password');
    if(!user || !(await user.correctPassword(password, user.password))) {
      res.status(401).json({
        message: 'Incorrect username or password',
        status: 'fail'
      })
    };

    const token = signToken(user._id);
    res.status(200).json({
      status: 'success',
      token,
    })
  } catch (error) {
    res.status(401).json({
      status: 'failed',
      error,
    })
  }
}