// middleware/checkSubscription.js

const db = require('../config/db');

module.exports = async (req, res, next) => {
  const { email } = req.body;

  const [rows] = await db.query('SELECT subscription_status FROM member WHERE email = ?', [email]);

  if (!rows.length || rows[0].subscription_status !== 'active') {
    return res.status(403).json({ error: 'Membership expired. Please renew to continue.' });
  }

  next();
};