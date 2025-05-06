const express = require('express');
const router = express.Router();
const MembersController = require('../controllers/memberController');
const { auth } = require('../middlewares/auth.js');

router.post('/createMember', MembersController.createMember);
router.get('/getAllMembers', MembersController.getAllMembers);
router.get('/getAllMentors', MembersController.getAllMentors);
router.get('/getMemberDetail/:id', MembersController.getMemberDetail);
router.get('/getAllMembersByPage',auth, MembersController.getAllMembersByPage);
router.get('/getAllMentorsByPage',auth, MembersController.getAllMentorsByPage);
router.put('/updateMember/:id',auth, MembersController.updateMember);
router.put('/updateMemberCredit/:id', MembersController.updateMemberCredit);
router.delete('/deleteMember/:id',auth, MembersController.deleteMember);
router.post('/loginMember', MembersController.loginMember);

module.exports = router;