const express = require('express');
const path = require('path');

const router = express.Router();

// Serve static files from the public directory
router.use(express.static(path.join(__dirname, '../../public')));

// Example login route (basic placeholder)
router.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Add authentication logic here
    if (username === 'user' && password === 'password') {
        res.send('Login successful');
    } else {
        res.status(401).send('Unauthorized');
    }
});

module.exports = router;
