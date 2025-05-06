const express = require('express');
const router = express.Router();
const EmailtemplatesController = require('../controllers/emailtemplateController');
const { auth } = require('../middlewares/auth.js');

router.post('/createEmailtemplate',auth, EmailtemplatesController.createEmailtemplate);
router.get('/getAllEmailtemplates', EmailtemplatesController.getAllEmailtemplates);
router.get('/getAllEmailtemplatesByPage',auth, EmailtemplatesController.getAllEmailtemplatesByPage);
router.put('/updateEmailtemplate/:id',auth, EmailtemplatesController.updateEmailtemplate);
router.delete('/deleteEmailtemplate/:id',auth, EmailtemplatesController.deleteEmailtemplate);

module.exports = router;