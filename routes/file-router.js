const express = require("express");
const fileUploader = require("../config/file-uploader.js");

const router = express.Router();

router.post(
  "/upload-file",
  fileUploader.single("fileSubmission"),
  (req, res, next) => {
    // multer puts all the information about the uploadedd file in "req.file"
    console.log("NEW FILE UPLOAD", req.file);

    if (!req.file) {
      next(new Error("No file uploaded!!"));
      return;
    }
    const { originalName, secure_url, format, width, height } = req.file;
    res.json({
      fileName: originalName,
      fileUrl: secure_url,
      format,
      width,
      height
    });
  }
);

module.exports = router;
