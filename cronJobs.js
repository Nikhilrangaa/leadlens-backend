const cron = require('node-cron');
const { fetchLeads } = require('./fetchLeads');
const { scoreAllLeads, detectEngagementSurges } = require('./scoreLeads');
const { refreshAccessToken } = require('./refreshToken');

// 1. Refresh Zoho token every 50 minutes
cron.schedule('*/50 * * * *', async () => {
  try {
    console.log('Proactive token refresh started...');
    await refreshAccessToken();
    console.log('Proactive token refresh complete!');
  } catch (error) {
    console.error('Proactive token refresh failed:', error);
  }
});

// 2. Fetch leads from Zoho CRM daily at 6 AM
cron.schedule('0 6 * * *', async () => {
  console.log('Daily lead fetch started...');
  await fetchLeads();
  console.log('Daily lead fetch complete!');
});

// 3. Recalculate scores daily at 6:10 AM (after fetching leads)
cron.schedule('10 6 * * *', async () => {
  console.log('Daily lead scoring started...');
  await scoreAllLeads();
  console.log('Daily lead scoring complete!');
});

// 4. Detect surges daily at 6:20 AM (after scoring)
cron.schedule('20 6 * * *', async () => {
  console.log('Daily engagement surge detection started...');
  await detectEngagementSurges();
  console.log('Daily engagement surge detection complete!');
});

// Optional: Export if you need to import this module elsewhere
module.exports = {};
