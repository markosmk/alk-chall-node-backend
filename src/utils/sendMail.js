const sgMail = require('@sendgrid/mail');
const config = require('../config');

const sendMail = async (toEmail, message, next) => {
  try {
    if (config.sendgrid_key) {
      sgMail.setApiKey(config.sendgrid_key);

      const msg = {
        to: toEmail,
        from: config.sendgrid_verified,
        subject: message.subject,
        html: message.html,
      };

      const sending = await sgMail.send(msg);
      if (sending) {
        return sending;
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports = sendMail;
