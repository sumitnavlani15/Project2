const cloudinary = require("cloudinary").v2;
const CloudinaryStorage = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: 'dk2n7cdur',
  api_key: '129465271399282',
  api_secret: 'ykcLo8UeqsYGQaCoHNymJs1VjnA',
});

// Storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: ['jpg', 'png', 'jpeg']
  }
});

module.exports = {
  cloudinary,
  storage
};