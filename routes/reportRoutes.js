// routes/reportRoutes.js
const express = require('express');
const router = express.Router();
const Lead = require('../leadModel'); // Adjust the path if needed

/**
 * GET /api/reports/engagement
 * Returns top leads (by score) and at-risk deals
 */
router.get('/reports/engagement', async (req, res) => {
  try {
    // Top 10 leads by score
    const topLeads = await Lead.find({}).sort({ score: -1 }).limit(10);

    // Leads flagged as at risk
    const atRiskDeals = await Lead.find({ isAtRisk: true });

    res.json({
      topLeads,
      atRiskDeals,
    });
  } catch (error) {
    console.error('Error fetching engagement reports:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
