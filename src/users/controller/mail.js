
var nodemailer = require('nodemailer');

exports.newuser=(link,email)=>{
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'joshua@innovixtech.com',
          pass: 'jecdkyumfxctscxf'
        }
      });

  
      var mailOptions = {
        from: 'joshua@innovixtech.com',
        to: "joshua@innovixtech.com",  //sanjiti@innovixtech.com
        subject: 'Sending Email using Node.js',
        text: link
      }
      
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
            res.send("Mail is send");
          console.log('Email sent: ' + info.response);
        }
      });

}

