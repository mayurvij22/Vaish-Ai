const express = require('express');
const router = express.Router();
const { uploadPlant } = require('../controllers/plantController');

router.post('/upload', uploadPlant);

module.exports = router;
