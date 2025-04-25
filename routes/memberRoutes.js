const express = require('express');
const router = express.Router();
const MembersController = require('../controllers/memberController');
const { auth } = require('../middlewares/auth.js');

router.post('/createMember', MembersController.createMember);
router.get('/getMember', MembersController.getAllMembers);
router.get('/getAllMembersByPage',auth, MembersController.getAllMembersByPage);
router.put('/updateMember/:id',auth, MembersController.updateMember);
router.delete('/deleteMember/:id',auth, MembersController.deleteMember);

module.exports = router;