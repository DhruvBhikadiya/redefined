const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { saveTransaction , updatePayment } = require('../models/paymentModel');

exports.createPaymentIntent = async (req, res) => {
  try {
    const { amount } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'inr',
    });

    // Save with status "created"
    saveTransaction(paymentIntent.id, amount, 'pending');

    res.status(200).json({ clientSecret: paymentIntent.client_secret , paymentIntent: paymentIntent.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.updatePaymentData = async (req, res) => {
    try {
      await updatePayment(req.body);
      res.status(200).json({ message: 'Payment updated' });
    } catch (err) {
      console.error('Error updating Payment:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };