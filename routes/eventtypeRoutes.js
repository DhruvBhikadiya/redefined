const express = require('express');
const router = express.Router();
const EventtypesController = require('../controllers/eventtypeController');
const { auth } = require('../middlewares/auth.js');

router.post('/createEventtype',auth, EventtypesController.createEventtype);
router.get('/getAllEventtypes', EventtypesController.getAllEventtypes);
router.get('/getAllEventtypesByPage',auth, EventtypesController.getAllEventtypesByPage);
router.put('/updateEventtype/:id',auth, EventtypesController.updateEventtype);
router.delete('/deleteEventtype/:id',auth, EventtypesController.deleteEventtype);

module.exports = router;