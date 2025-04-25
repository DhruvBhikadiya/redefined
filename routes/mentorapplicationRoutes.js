const express = require('express');
const router = express.Router();
const MentorapplicationsController = require('../controllers/mentorapplicationController');
const { auth } = require('../middlewares/auth.js');

router.post('/createMentorapplication', MentorapplicationsController.createMentorapplication);
router.get('/getMentorapplication', MentorapplicationsController.getAllMentorapplications);
router.get('/getAllMentorApplicationsByPage',auth, MentorapplicationsController.getAllMentorApplicationsByPage);
router.put('/updateMentorapplication/:id',auth, MentorapplicationsController.updateMentorapplication);
router.put('/approveMentorapplication/:id',auth, MentorapplicationsController.approveMentorapplication);
router.put('/rejectMentorapplication/:id',auth, MentorapplicationsController.rejectMentorapplication);
router.delete('/deleteMentorapplication/:id',auth, MentorapplicationsController.deleteMentorapplication);

module.exports = router;