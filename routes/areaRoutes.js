const express = require('express');
const router = express.Router();
const AreasController = require('../controllers/areaController');
const { auth } = require('../middlewares/auth.js');

router.post('/createArea',auth, AreasController.createArea);
router.get('/getAllAreas', AreasController.getAllAreas);
router.get('/getAllAreasByPage',auth, AreasController.getAllAreasByPage);
router.put('/updateArea/:id',auth, AreasController.updateArea);
router.delete('/deleteArea/:id',auth, AreasController.deleteArea);

module.exports = router;