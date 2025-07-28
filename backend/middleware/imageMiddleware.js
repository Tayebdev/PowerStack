const multer = require("multer");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const ErrorAPI = require("../utils/ErrorAppi");

exports.uploadImage = (folderName) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "..", "Uploads", folderName);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, uuidv4() + path.extname(file.originalname));
    },
  });

  const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ErrorAPI("Only image files are allowed", 400), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: { fileSize: 5 * 1024 * 1024 },
  });
};

exports.removeImage = (filename) => {
  return new Promise((resolve, reject) => {
    if (!filename) {
      return resolve({ message: "Picture not found" });
    }
    fs.unlink(filename, (err) => {
      if (err) {
        return reject({ message: "Error deleting file", error: err });
      } else {
        return resolve({
          message: "File deleted successfully",
          filepath: filename,
        });
      }
    });
  });
};




