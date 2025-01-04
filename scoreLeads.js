// scoreLeads.js
const { calculateLeadScore } = require('./scoringUtils');
const Lead = require('./leadModel');
const connectDB = require('./db'); // Make sure this file connects to MongoDB

// Connect to the database first
connectDB().then(() => {
  console.log('Database connected successfully.');
  scoreAllLeads(); // Start scoring after the database connection is established
});

async function scoreAllLeads() {
  try {
    const leads = await Lead.find({});
    for (const lead of leads) {
      // 1. Calculate the score
      const score = calculateLeadScore(lead);
      lead.score = score;

      // 2. isAtRisk if score < 10 (example threshold)
      lead.isAtRisk = score < 10;

      // 3. Save the updated lead
      await lead.save();
    }
    console.log('All leads have been scored.');
  } catch (error) {
    console.error('Error scoring leads:', error.message);
  }
}

// Optional: Engagement Surge Detection
async function detectEngagementSurges() {
  try {
    const leads = await Lead.find({});

    for (const lead of leads) {
      // Example logic
      if (lead.score > 50) {
        console.log(`High engagement detected for Lead ID: ${lead.id}`);
        // Trigger notification or reminder
      } else if (lead.isAtRisk) {
        console.log(`Deal at risk for Lead ID: ${lead.id}`);
        // Prompt follow-up
      }
    }
  } catch (error) {
    console.error('Error detecting engagement surges:', error.message);
  }
}

module.exports = { scoreAllLeads, detectEngagementSurges };
