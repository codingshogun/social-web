module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong, try again later";

  res.status(err.statusCode).json({
    status: "error",
    message: err.message,
    stack: err.stack,
  });
};
