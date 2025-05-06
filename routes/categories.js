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
// ✅ Get all categories
router.get('/', async (req, res) => {
    const categoryList = await Category.find();
    if (!categoryList) {
        return res.status(500).json({ success: false });
    }
    res.send(categoryList);
});

// ✅ Create a new category
router.post('/create', async (req, res) => {
    const { name, color, images } = req.body;

    const limit = pLimit(2); // Limit concurrent uploads

    try {
        const imagesToUpload = images.map((image) => {
            return limit(async () => {
                const result = await cloudinary.uploader.upload(image, {
                    resource_type: 'image'
                });
                return result.secure_url;
            });
        });

        const uploadedImages = await Promise.all(imagesToUpload);

        const newCategory = new Category({
            name,
            color,
            images: uploadedImages
        });

        await newCategory.save();

        res.status(201).json({
            success: true,
            message: 'Category created successfully',
            category: newCategory
        });
    } catch (err) {
        console.error('❌ Category creation failed:', err); // Show full error
        res.status(500).json({
            success: false,
            message: 'Category creation failed',
            error: err.message || err
        });
    }
});

module.exports = router;
