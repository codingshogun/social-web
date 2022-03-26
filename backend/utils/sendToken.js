module.exports = (user, statusCode, res) => {
  const token = user.getJsonWebToken();
  res
    .status(200)
    .cookie("token", token, {
      expires: new Date(
        Date.now() + process.env.COOKIE_EXPIRE_DATE * 60 * 60 * 60 * 1000
      ),
    })
    .json({
      status: "success",
      user: user,
    });
};
