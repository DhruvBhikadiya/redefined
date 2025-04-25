const express = require('express');
const router = express.Router();
const IndustrysController = require('../controllers/industryController');
const { auth } = require('../middlewares/auth.js');

router.post('/createIndustry',auth, IndustrysController.createIndustry);
router.get('/getAllIndustrys', IndustrysController.getAllIndustrys);
router.get('/getAllIndustrysByPage',auth, IndustrysController.getAllIndustrysByPage);
router.put('/updateIndustry/:id',auth, IndustrysController.updateIndustry);
router.delete('/deleteIndustry/:id',auth, IndustrysController.deleteIndustry);

module.exports = router;