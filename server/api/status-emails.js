'use strict';
const nodemailer = require('nodemailer');

const sendEmail = (email, orderId, status) => {
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
  let created = {
    from: '"ThreeFeetTeam" `threefeetfullstack@gmail.com', // sender address
    to: email, // list of receivers
    subject: `Order #${orderId} - Purchased`, // Subject line
    text: `Hey ${email}! Thanks for placing order ${orderId}. We'll get right on it.`, // plain text body
    // html: '<b>Hello world?</b>' // html body
  };
  let processing = {
    from: '"ThreeFeetTeam" `threefeetfullstack@gmail.com', // sender address
    to: email, // list of receivers
    subject: `Order #${orderId} - Processing`, // Subject line
    text: `Hey ${email}! Just FYI, Order ${orderId} is processing. Thanks!`, // plain text body
    // html: '<b>Hello world?</b>' // html body
  };

  let shipped = {
    from: '"ThreeFeetTeam" `threefeetfullstack@gmail.com', // sender address
    to: email, // list of receivers
    subject: `Order #${orderId} - Shipped`, // Subject line
    text: `Hey ${email}! Just FYI, ${orderId} has shipped. Thanks!`, // plain text body
    // html: '<b>Hello world?</b>' // html body
  };
  
  let cancelled = {
    from: '"ThreeFeetTeam" `threefeetfullstack@gmail.com', // sender address
    to: email, // list of receivers
    subject: `Order #${orderId} - Cancelled`, // Subject line
    text: `Hey ${email}! Just FYI, ${orderId} was cancelled. Thanks!`, // plain text body
    // html: '<b>Hello world?</b>' // html body
  };

  const actions = {
    Created: created,
    Processing: processing,
    Completed: shipped,
    Cancelled: cancelled
  }

  const action = actions[status]
  
  transporter.sendMail(action, (error, info) => {
    console.log(email, action)
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
