var nodemailer = require('nodemailer');

console.log("===============");

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'joshua@innovixtech.com',
    pass: 'Iitc@1234'
  }
});

var mailOptions = {
  from: 'joshua@innovixtech.com',
  to: 'sridhar@innovixtech.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});