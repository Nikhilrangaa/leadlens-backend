// leadModel.js
const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema(
  {
    First_Name: { type: String },
    Last_Name: { type: String },
    Company: { type: String },
    id: { type: String, unique: true }, // Zoho's unique ID
    lastEngagementDate: { type: Date }, // for engagement-based scoring
    clicks: { type: Number, default: 0 },
    opens: { type: Number, default: 0 },
    score: { type: Number, default: 0 },     // <-- explicitly define 'score'
    isAtRisk: { type: Boolean, default: false }, // <-- explicitly define 'isAtRisk'
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lead', leadSchema);
