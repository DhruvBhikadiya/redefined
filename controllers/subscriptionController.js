const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Member = require('../models/memberModel');

exports.createSubscription = async (req, res) => {
    try {
      const { email, member, paymentMethodId } = req.body;
  
      // 1. Create customer with payment method
      const customer = await stripe.customers.create({
        email,
        payment_method: paymentMethodId,
        invoice_settings: {
          default_payment_method: paymentMethodId,
        },
      });
  
      // 2. Verify payment method is attached
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer.id,
        type: 'card',
      });
  
      if (paymentMethods.data.length === 0) {
        throw new Error('Payment method not attached to customer');
      }
  
      // 3. Create subscription with explicit payment settings
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: process.env.STRIPE_PRICE_ID }],
        payment_settings: {
          payment_method_options: {
            card: {
              request_three_d_secure: 'automatic',
            },
          },
          payment_method_types: ['card'],
          save_default_payment_method: 'on_subscription',
        },
        expand: ['latest_invoice.payment_intent', 'pending_setup_intent'],
      });
  
      // 4. Handle different success cases
      let clientSecret;
      if (subscription.latest_invoice?.payment_intent) {
        clientSecret = subscription.latest_invoice.payment_intent.client_secret;
      } else if (subscription.pending_setup_intent) {
        clientSecret = subscription.pending_setup_intent.client_secret;
      } else {
        throw new Error('No payment authorization mechanism available');
      }
  
      // 5. Save to database
      member.stripe_customer_id = customer.id;
      member.stripe_subscription_id = subscription.id;
      member.subscription_status = subscription.status;
      member.last_payment_date = new Date();
      member.next_payment_due = new Date(subscription.current_period_end * 1000);
  
      await Member.create(member);
      
      res.json({
        member,
        clientSecret,
        requiresAction: subscription.status === 'incomplete',
        subscriptionId: subscription.id,
      });
  
    } catch (err) {
      console.error('Subscription Error:', err);
      res.status(500).json({
        error: err.message,
        type: err.type || 'subscription_error',
      });
    }
  };
  