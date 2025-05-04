const { sendEmail } = require('../utils/sendEmail');
const emaillog = require('../models/emaillogModel');

const sendEmailController = async (req, res) => {
  try {
    const { to, subject, message } = req.body;

    if (!to || !subject || !message) {
      return res.status(400).json({ message: 'Required fields missing' });
    }

    let html = message;

    await sendEmail({ to, subject, html });

    let emailData = {
        recipient : to,
        message : message,
        subject : subject,
    }

    emaillog.create(emailData, (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Email sent but failed to log' });
      }
      res.status(200).json({ message: 'Email sent & logged successfully!' });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to send email' });
  }
};

module.exports = { sendEmailController };
