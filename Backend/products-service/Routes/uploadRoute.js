const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { v2: cloudinary } = require('cloudinary');
const router = express.Router();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'products',
    allowed_formats: ['avif','jpg', 'png', 'jpeg','webp'],
  },
});

const upload = multer({ storage });


router.post('/upload-images', upload.array('images', 5), (req, res) => {
    const imageUrls = req.files.map(file => file.path);
    res.status(200).json({ imageUrls });
  });
  
module.exports = router;
