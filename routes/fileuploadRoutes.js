const express = require("express");
const multer = require("multer");
const { uploadFile , deleteFile , listFolders , getFilesByPath } = require("../controllers/fileuploadController");
const { auth } = require('../middlewares/auth.js');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post("/upload", upload.single("file"),auth, uploadFile);
router.delete('/deleteFile/:fileId',auth , deleteFile);
router.post('/getFoldersByPath', auth , listFolders);
router.post('/getFilesByPath', auth , getFilesByPath);

module.exports = router;