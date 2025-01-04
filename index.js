// index.js
const express = require('express');
require('dotenv').config();
const connectDB = require('./db');

// If you plan to store or read Zoho credentials from a file, uncomment below:
// const fs = require('fs');

// Route modules
const reportRoutes = require('./routes/reportRoutes');
// If you have a separate file for leadRoutes, import it similarly:
// const leadRoutes = require('./routes/leadRoutes');

const app = express();

// Root endpoint
app.get('/', (req, res) => {
  res.send('Hello CRM Insights!');
});

// Parse JSON bodies (useful for POST/PATCH requests)
app.use(express.json());

// Connect to MongoDB, then start the server
connectDB()
  .then(() => {
    console.log('Database connected successfully.');

    // Now that the DB is connected, require cron jobs
    // This ensures cron tasks do not run prematurely
    require('./cronJobs');

    // Mount your routes
    // If you have leadRoutes, you'd do: app.use('/api', leadRoutes);
    app.use('/api', reportRoutes);

    // Finally, start the server
    app.listen(3000, () => console.log('Server running on port 3000'));
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });

// If you still need to write Zoho credentials to a file, do so here (optional)
// const credentials = `Client ID: 1000.XXXX
// Client Secret: XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`;
// fs.writeFileSync('apikeyconnectzoho.txt', credentials, 'utf8');

// If you need to read them back in a similar way, uncomment below
// const fileContent = fs.readFileSync('apikeyconnectzoho.txt', 'utf8');
// const [clientIdLine, clientSecretLine] = fileContent.split('\n');
// const CLIENT_ID = clientIdLine.split(': ')[1].trim();
// const CLIENT_SECRET = clientSecretLine.split(': ')[1].trim();

// console.log(`Client ID: ${CLIENT_ID}`);
// console.log(`Client Secret: ${CLIENT_SECRET}`);


