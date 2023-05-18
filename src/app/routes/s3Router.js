const express = require("express");
const formidable = require("express-formidable");
const formidableParams = {
    encoding: 'utf-8',
    uploadDir: './uploads',
    multiples: true,
    keepExtensions: true
  }

const router = express.Router();

// controllers
const s3Controller = require("../controllers/s3Controller");

router.post("/upload-image", formidable(formidableParams), s3Controller.uploadImage);
router.post("/remove-image/:key", s3Controller.removeImage);
router.post("/upload-video", formidable(formidableParams), s3Controller.uploadVideo);
router.post("/remove-video/:key", s3Controller.removeVideo);

module.exports = router;
