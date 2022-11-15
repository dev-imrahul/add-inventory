const User = require("./../models/userModel");

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

exports.getAllUsers = catchAsync(async(req, res, next) => {
  const data = await User.find();
  res.status(200).json({
    data
  })
})