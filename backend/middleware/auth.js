const catchAsync = require("./catchAsync");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const customError = require("./customError");

//is logged in?
module.exports = catchAsync(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new customError("login required", 404));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await userModel.findById(decoded.id);
  if (!user) {
    return next(new customError("login required", 404));
  }
  req.user = user;
  next();
});
