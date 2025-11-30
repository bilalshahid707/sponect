const multer= require("multer")
const AppError = require('../utils/AppError')

const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); 
  } else {
    cb(new Error("Only JPG, JPEG, PNG, or WEBP images are allowed"), false);
  }
};

const upload = multer({storage:storage,fileFilter:fileFilter,limits:{fileSize: 5 * 1024 * 1024}})

module.exports = upload