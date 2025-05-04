const express = require('express');
const router = express.Router();
const PerksController = require('../controllers/perkController');
const { auth } = require('../middlewares/auth.js');

router.post('/createPerk',auth, PerksController.createPerk);
router.get('/getAllPerks', PerksController.getAllPerks);
router.get('/getAllPerksByPage',auth, PerksController.getAllPerksByPage);
router.put('/updatePerk/:id',auth, PerksController.updatePerk);
router.delete('/deletePerk/:id',auth, PerksController.deletePerk);

module.exports = router;