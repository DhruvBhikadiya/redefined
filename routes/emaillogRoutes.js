const express = require('express');
const router = express.Router();
const EmaillogsController = require('../controllers/emaillogController');
const { auth } = require('../middlewares/auth.js');

router.post('/createEmaillog',auth, EmaillogsController.createEmaillog);
router.get('/getAllEmaillogs', EmaillogsController.getAllEmaillogs);
router.get('/getAllEmaillogsByPage',auth, EmaillogsController.getAllEmaillogsByPage);
router.put('/updateEmaillog/:id',auth, EmaillogsController.updateEmaillog);
router.delete('/deleteEmaillog/:id',auth, EmaillogsController.deleteEmaillog);

module.exports = router;