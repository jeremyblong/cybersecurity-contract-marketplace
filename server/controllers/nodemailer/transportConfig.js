const mailer = require('nodemailer');

const mailConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "blongjeremy@gmail.com",
    pass: "J@>rudB=YnN8.5nk"
  }
};

const transporter = mailer.createTransport(mailConfig);

module.exports = transporter;