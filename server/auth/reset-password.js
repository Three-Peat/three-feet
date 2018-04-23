'use strict';
const nodemailer = require('nodemailer');

const sendEmail = email => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: `threefeetfullstack@gmail.com`,
      pass: `thr33f33t`
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: '"ThreeFeetTeam" `threefeetfullstack@gmail.com', // sender address
    to: email, // list of receivers
    subject: 'Password Reset', // Subject line
    text: `Hey ${email}! Just FYI, next time you login you will need to reset your password. Thanks!`, // plain text body
    // html: '<b>Hello world?</b>' // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
}

module.exports = sendEmail
