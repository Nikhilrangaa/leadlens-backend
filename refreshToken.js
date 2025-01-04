// refreshToken.js

const axios = require("axios");

// Replace these with your actual credentials
const CLIENT_ID = "1000.U28LLUHJ6SIJZ52CA3MAOWP6X871MR";
const CLIENT_SECRET = "caf88afbbc412698dac265aada47ba8dabc74cfe00";
const REFRESH_TOKEN = "1000.3997e950a262fa64d2a2a6239460b50f.12601a29915ddc7c7eb06d171b62d2ab";

// In-memory storage for the access token and expiry time
let accessToken = null;
let tokenExpiryTime = 0; // Unix timestamp for when the token expires

// Function to get the current access token
async function getAccessToken() {
  const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

  // Refresh the token if it doesn't exist or is about to expire (within 30 seconds)
  if (!accessToken || currentTime >= tokenExpiryTime - 30) {
    await refreshAccessToken();
  }

  return accessToken;
}

// Function to refresh the access token
async function refreshAccessToken() {
  try {
    const response = await axios.post("https://accounts.zoho.com/oauth/v2/token", null, {
      params: {
        refresh_token: REFRESH_TOKEN,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "refresh_token",
      },
    });

    accessToken = response.data.access_token;
    tokenExpiryTime = Math.floor(Date.now() / 1000) + parseInt(response.data.expires_in, 10);

    console.log("New access token fetched:", accessToken);
    console.log("Token will expire at:", new Date(tokenExpiryTime * 1000).toLocaleString());
  } catch (error) {
    console.error("Failed to refresh access token:", error.response?.data || error.message);
    throw new Error("Error refreshing access token");
  }
}

module.exports = { getAccessToken };
