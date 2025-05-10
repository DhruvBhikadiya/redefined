const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const webhook = require('../webhook/webhook');

router.post('/create-subscription', subscriptionController.createSubscription);
router.post('/webhook', express.raw({ type: 'application/json' }), webhook.handleStripeWebhook);

module.exports = router;