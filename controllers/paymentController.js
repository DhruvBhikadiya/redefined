const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { saveTransaction , saveEventTransaction , getAllMemberpaymentsByPage , updateEventPayment , updatePayment } = require('../models/paymentModel');

exports.createPaymentIntent = async (req, res) => {
  try {
    let { amount, email } = req.body;
    amount = amount*100

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    saveTransaction(paymentIntent.id, paymentIntent.currency, amount, 'pending', email);

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

exports.createEventPaymentIntent = async (req, res) => {
  try {
    let { amount, email, eventId , memberId } = req.body;
    amount = amount*100

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });

    saveEventTransaction(eventId, memberId, paymentIntent.id, paymentIntent.currency, amount, 'pending', email);

    res.status(200).json({ clientSecret: paymentIntent.client_secret , paymentIntent: paymentIntent.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateEventPaymentData = async (req, res) => {
    try {
      await updateEventPayment(req.body);
      res.status(200).json({ message: 'Payment updated' });
    } catch (err) {
      console.error('Error updating Payment:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };


  
exports.getAllMemberpaymentsByPage = async (req, res) => {
  try {
    const { limit = 10, page = 1, searchtxt = '' } = req.query;
    
    const results = await getAllMemberpaymentsByPage(Number(limit), Number(page), searchtxt);

    res.status(200).json({
      status: 'success',
      data: results.data,
      totalCount: results.totalCount,
      totalEventpayments: Math.ceil(results.totalCount / limit),
    });
  } catch (err) {
    console.error('Error fetching Eventpayments:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

