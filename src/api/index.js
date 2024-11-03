const express = require('express');
const stockRoutes = require('./routes/stockRoutes');

const router = express.Router();

// Use the routes for stock API
router.use('/stocks', stockRoutes);

module.exports = router;
