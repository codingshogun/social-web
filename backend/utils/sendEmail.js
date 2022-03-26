const nodemailer = require("nodemailer");

module.exports = async (options) => {
  var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "0731334b49b821",
      pass: "23429efdbeb691",
    },
  });
  await transport.sendMail({
    from: process.env.SMPT_MAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  });
};
