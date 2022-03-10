var nodemailer = require("nodemailer");

function sendMail(receiverEmail, subject, text) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahsan.btph234@gmail.com",
      pass: "aden12345678",
    },
  });

  var mailOptions = {
    from: "ahsan.btph234@gmail.com",
    to: receiverEmail,
    subject: subject,
    text: text,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
}

module.exports = sendMail;
