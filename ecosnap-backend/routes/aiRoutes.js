const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadAndAnalyzeWaste } = require('../controllers/aiController');

router.post('/upload', protect, upload.single('image'), uploadAndAnalyzeWaste);

module.exports = router;
