const mailer = require('nodemailer');

const mailConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "blongjeremy@gmail.com",
    pass: "DaWm;@YL]9a}<<]2"
  }
};

const transporter = mailer.createTransport(mailConfig);

module.exports = transporter;