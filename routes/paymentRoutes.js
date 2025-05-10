const express = require('express');
const router = express.Router();
const { createPaymentIntent, updateEventPaymentData, getAllMemberpaymentsByPage, createEventPaymentIntent, updatePaymentData } = require('../controllers/paymentController');

router.post('/createPayment', createPaymentIntent);
router.post('/updatePayment', updatePaymentData);
router.post('/createEventPayment', createEventPaymentIntent);
router.post('/updateEventPaymentData', updateEventPaymentData);

router.get('/getAllMemberpaymentsByPage', getAllMemberpaymentsByPage);
module.exports = router;