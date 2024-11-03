const express = require('express');
const router = express.Router();

// Example stock data endpoint
router.get('/:symbol', (req, res) => {
    const stockSymbol = req.params.symbol;
    // Dummy data; replace with actual data fetching logic
    const data = { symbol: stockSymbol, price: 123.45, volume: 50000 };
    res.json(data);
});

module.exports = router;
