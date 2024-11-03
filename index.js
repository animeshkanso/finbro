const express = require('express');
const config = require('./src/config/config');
const apiApp = require('./src/api');
const siteApp = require('./src/site');
const startBot = require('./src/bot/bot');

const app = express();

// Mount API at /api
app.use('/api', apiApp);

// Mount website at /site (serve static files)
app.use('/site', siteApp);

// Start the Discord bot
startBot();

app.listen(config.port, () => {
    console.log(`Server running on http://localhost:${config.port}`);
});
