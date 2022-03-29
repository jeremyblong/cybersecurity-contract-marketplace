const mailer = require('nodemailer');

const mailConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "blongjeremy@gmail.com",
    pass: "gAGsD87rZ9#@"
  }
};

const transporter = mailer.createTransport(mailConfig);

module.exports = transporter;