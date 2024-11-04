// src/api/index.js
const express = require('express');
const newsRouter = require('./routes/fetchNews');
const router = express.Router();

// Use JSON middleware
router.use(express.json());

// Define API routes
router.use('/stocks/news', newsRouter);

// Export router to be used in the main app
module.exports = router;
