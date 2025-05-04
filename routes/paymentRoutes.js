const express = require('express');
const router = express.Router();
const { createPaymentIntent, updateEventPaymentData, createEventPaymentIntent, updatePaymentData } = require('../controllers/paymentController');

router.post('/createPayment', createPaymentIntent);
router.post('/createEventPayment', createEventPaymentIntent);
router.post('/updatePayment', updatePaymentData);
router.post('/updateEventPaymentData', updateEventPaymentData);
module.exports = router;