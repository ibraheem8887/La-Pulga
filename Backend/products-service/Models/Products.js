const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  sku: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  avgRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  images: {
    type: [String], // Array of Cloudinary image URLs
    required: true,
  },
  reviews: [{
    user: String,
    comment: String,
    rating: Number,
    date: { type: Date, default: Date.now },
  }],
}, { timestamps: true });

const Products = mongoose.model('Products', ProductsSchema);

module.exports = Products;
