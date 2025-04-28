const express = require('express');
const router = express.Router();
const { createPaymentIntent, updatePaymentData } = require('../controllers/paymentController');

router.post('/createPayment', createPaymentIntent);
router.post('/updatePayment', updatePaymentData);
module.exports = router;