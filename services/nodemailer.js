let nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'eandeautoservices@gmail.com',
    pass: 'eandeautoservices77098'
  }
});

module.exports = {
  transporter: transporter
}
