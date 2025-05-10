const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Member = require('../models/memberModel');

exports.handleStripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET; // from Stripe dashboard

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle subscription events
  if (event.type === 'invoice.payment_succeeded') {
    const subscription = event.data.object.subscription;
    const customerId = event.data.object.customer;
    const periodEnd = event.data.object.lines.data[0].period.end;

    Member.getByCustomerId(customerId, (err, results) => {
      if (err || results.length === 0) return;

      const email = results[0].email;
      const updateData = {
        subscription_status: 'active',
        last_payment_date: new Date(),
        next_payment_due: new Date(periodEnd * 1000),
      };

      Member.updateSubscription(email, updateData, () => {});
    });
  }

  if (event.type === 'invoice.payment_failed') {
    const customerId = event.data.object.customer;

    Member.getByCustomerId(customerId, (err, results) => {
      if (err || results.length === 0) return;

      const email = results[0].email;
      Member.updateSubscription(email, { subscription_status: 'past_due' }, () => {});
    });
  }

  res.json({ received: true });
};
