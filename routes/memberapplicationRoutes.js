const express = require('express');
const router = express.Router();
const MemberapplicationsController = require('../controllers/memberapplicationController');
const { auth } = require('../middlewares/auth.js');

router.post('/createMemberapplication', MemberapplicationsController.createMemberapplication);
router.get('/getMemberapplication', MemberapplicationsController.getAllMemberapplications);
router.get('/getAllMemberapplicationsByPage',auth, MemberapplicationsController.getAllMemberapplicationsByPage);
router.put('/approveMemberapplication/:id',auth, MemberapplicationsController.approveMemberapplication);
router.put('/rejectMemberapplication/:id',auth, MemberapplicationsController.rejectMemberapplication);
router.delete('/deleteMemberapplication/:id',auth, MemberapplicationsController.deleteMemberapplication);

module.exports = router;