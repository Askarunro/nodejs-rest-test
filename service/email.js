const { PASS_EMAIL, EMAIL, PORT_CONNECT } = require("../helpers/env");
const nodemailer = require("nodemailer");

const BASE_URL = `localhost:${PORT_CONNECT}/api`;

const sendEmail = async (userEmail, code) => {
const link = `${BASE_URL}/users/verify/${code}`

  const config = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: EMAIL,
      pass: PASS_EMAIL,
    },
  };

  const emailOptions = {
    from: EMAIL,
    to: userEmail,
    subject: "Nodemailer test",
    html: `<p>Click ${link} on this to confirm registration</p>`
    // html: `<h4>Click on this link to confirm registration ${link}</h4>`,
  };

  const transporter = nodemailer.createTransport(config);
  await transporter
    .sendMail(emailOptions)
    .then((info) => console.log(info))
    .catch((err) => console.log(err));
};

module.exports = {
  sendEmail,
};
