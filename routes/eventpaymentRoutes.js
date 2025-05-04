const express = require('express');
const router = express.Router();
const EventpaymentsController = require('../controllers/eventpaymentController');
const { auth } = require('../middlewares/auth.js');

router.post('/createEventpayment', EventpaymentsController.createEventpayment);
router.get('/getAllEventpayments', EventpaymentsController.getAllEventpayments);
router.get('/getAllEventpaymentsByPage',auth, EventpaymentsController.getAllEventpaymentsByPage);
router.put('/updateEventpayment/:id',auth, EventpaymentsController.updateEventpayment);
router.delete('/deleteEventpayment/:id',auth, EventpaymentsController.deleteEventpayment);

module.exports = router;