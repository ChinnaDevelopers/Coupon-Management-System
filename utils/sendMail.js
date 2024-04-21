const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = (email, subject, html) => {
  let mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject,
    html,
    cc: process.env.EMAIL,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
      res.send("Error");
    } else {
      console.log("Email sent: " + info.response);
      res.send("Email sent");
    }
  });
};

module.exports = sendMail;
