const express = require('express');
const router = express.Router();
const EventsController = require('../controllers/eventController');
const { auth } = require('../middlewares/auth.js');

router.post('/createEvent',auth, EventsController.createEvent);
router.get('/getAllEvents', EventsController.getAllEvents);
router.get('/getUpcomingEvents', EventsController.getUpcomingEvents);
router.get('/getPastEvents', EventsController.getPastEvents);
router.get('/getEventDetail/:id', EventsController.getEventDetail);
router.get('/getAllEventsByPage', EventsController.getAllEventsByPage);
router.put('/updateEvent/:id',auth, EventsController.updateEvent);
router.delete('/deleteEvent/:id',auth, EventsController.deleteEvent);

module.exports = router;