// routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const Lead = require('../leadModel');

// Get all leads (with optional pagination)
router.get('/leads', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const leads = await Lead.find({})
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    console.error('Error fetching leads:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get a single lead by ID
router.get('/leads/:id', async (req, res) => {
  try {
    const lead = await Lead.findOne({ id: req.params.id });
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }
    res.json(lead);
  } catch (error) {
    console.error('Error fetching lead:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
