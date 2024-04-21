const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

const sendSMS = async (to, body) => {
  client.messages
    .create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER,
      to,
    })
    .then((message) => {
      console.log(message.sid);
    })
    .catch((err) => {
      console.log(err);
      throw new Error("Error sending message, please try again later");
    });
};

module.exports = sendSMS;
