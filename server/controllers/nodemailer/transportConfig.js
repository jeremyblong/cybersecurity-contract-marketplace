const mailer = require('nodemailer');

const mailConfig = {
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "blongjeremy@gmail.com",
    pass: ":%[}f4}.)r)Y6kL%"
  }
};

const transporter = mailer.createTransport(mailConfig);

module.exports = transporter;