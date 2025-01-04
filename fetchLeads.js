const axios = require('axios');
const Lead = require('./leadModel'); // Import the Lead model
const connectDB = require('./db'); // Import the database connection logic
const { getAccessToken } = require('./refreshToken'); // Import Zoho access token logic

// Function to fetch and store leads
async function fetchLeads() {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Retrieve a fresh Zoho access token
    const token = await getAccessToken();

    // 3. Fetch leads from Zoho CRM
    const response = await axios.get(
      'https://www.zohoapis.com/crm/v7/Leads?fields=First_Name,Last_Name,Company',
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${token}`,
        },
      }
    );

    const zohoLeads = response.data.data; // Array of lead objects
    console.log('Leads Data:', JSON.stringify(zohoLeads, null, 2));

    // 4. Upsert leads into MongoDB
    for (const leadData of zohoLeads) {
      await Lead.findOneAndUpdate(
        { id: leadData.id }, // Match by Zoho's unique ID
        leadData, // Update with the full object
        { upsert: true, new: true } // Create if not exists
      );
    }

    console.log('✅ Leads stored in MongoDB');
    process.exit(0); // Exit script when done
  } catch (err) {
    console.error('Error fetching or saving leads:', err.response?.data || err.message);
    process.exit(1); // Exit with error code
  }
}

// Execute the function
fetchLeads();
