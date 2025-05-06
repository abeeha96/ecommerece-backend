const express = require('express');
const router = express.Router();
const { Category } = require('../models/category');
const pLimit = require('p-limit');
const cloudinary = require('cloudinary').v2;
require('dotenv').config(); // ✅ Load .env variables

// ✅ Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});