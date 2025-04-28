const express = require('express');
const router = express.Router();
const EventmembersController = require('../controllers/eventmemberController');
const { auth } = require('../middlewares/auth.js');

router.post('/createEventmember',auth, EventmembersController.createEventmember);
router.get('/getAllEventmembers', EventmembersController.getAllEventmembers);
router.get('/getAllEventmembersByEvent/:id', EventmembersController.getAllEventmembersByEvent);
router.get('/getAllEventmembersByPage',auth, EventmembersController.getAllEventmembersByPage);
router.put('/updateEventmember/:id',auth, EventmembersController.updateEventmember);
router.delete('/deleteEventmember/:id',auth, EventmembersController.deleteEventmember);

module.exports = router;