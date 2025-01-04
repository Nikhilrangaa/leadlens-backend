const axios = require('axios');

// Replace this with your actual, valid Zoho access token
const ACCESS_TOKEN = "1000.77c0c3b3e0045f55b631630da39bfd8b.99d7bc5f36143b085fa054189e4f54d3";

async function fetchLeads() {
  try {
    const response = await axios.get(
      "https://www.zohoapis.com/crm/v7/Leads?fields=First_Name,Last_Name,Company",
      {
        headers: {
          "Authorization": `Zoho-oauthtoken ${ACCESS_TOKEN}`
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching leads:', error.response?.data || error.message);
    throw error;
  }
}

// Test function call
(async () => {
  try {
    const data = await fetchLeads();
    console.log('Leads Data:', JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Failed to fetch leads:', err);
  }
})();
