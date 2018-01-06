const nodemailer = require('nodemailer');
const providers = require('./providers.json');
const { email } = require('./config');

const transporter = nodemailer.createTransport({
  service: email.service,
  auth: {
    user: email.user,
    pass: email.password
  }
 });

module.exports = function (recipient, message, cb) {
  const { number, provider } = recipient;

  const mailOptions = {
    from: email.user,
    to: number + providers[provider],
    html: message
  };
  
  transporter.sendMail(mailOptions, (err) => {
    if(err && cb) { cb(err); }
  });
};