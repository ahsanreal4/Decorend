var nodemailer = require("nodemailer");

function sendMail(receiverEmail, subject, text) {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahsan.btph123@gmail.com",
      pass: "byowrwxudgwiehug",
    },
  });

  var mailOptions = {
    from: "ahsan.btph123@gmail.com",
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
