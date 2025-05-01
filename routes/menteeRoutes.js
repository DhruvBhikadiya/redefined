const express = require('express');
const router = express.Router();
const MenteesController = require('../controllers/menteeController');
const { auth } = require('../middlewares/auth.js');

router.post('/createMentee',auth, MenteesController.createMentee);
router.get('/getAllMentees', MenteesController.getAllMentees);
router.get('/getAllMenteesByPage',auth, MenteesController.getAllMenteesByPage);
router.put('/updateMentee/:id',auth, MenteesController.updateMentee);
router.delete('/deleteMentee/:id',auth, MenteesController.deleteMentee);

module.exports = router;