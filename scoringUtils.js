// scoringUtils.js

/**
 * Calculates the engagement-based lead score.
 * 
 * @param {Object} lead - The lead object with engagement data.
 * @returns {Number} - Calculated lead score.
 */
function calculateLeadScore(lead) {
    let score = 0;
  
    // Engagement weights
    const WEIGHTS = {
      opens: 1,   // 1 point per open
      clicks: 3,  // 3 points per click
    };
  
    const DECAY_THRESHOLD_DAYS = 30; // After 30 days, apply decay
    const DECAY_FACTOR = 0.8;       // 20% decay
  
    // 1. Apply time-based decay if lastEngagementDate exists
    if (lead.lastEngagementDate) {
      const daysSinceLastEngagement =
        (Date.now() - new Date(lead.lastEngagementDate).getTime()) /
        (1000 * 60 * 60 * 24);
  
      if (daysSinceLastEngagement > DECAY_THRESHOLD_DAYS) {
        // For every 30 days past threshold, apply decay
        const decaySteps = Math.floor(daysSinceLastEngagement / DECAY_THRESHOLD_DAYS);
        score *= Math.pow(DECAY_FACTOR, decaySteps);
      }
    }
  
    // 2. Calculate base score from opens and clicks
    score += (lead.opens || 0) * WEIGHTS.opens;
    score += (lead.clicks || 0) * WEIGHTS.clicks;
  
    // 3. Bonus points if there's a scheduled demo
    if (lead.demoScheduled) {
      score += 10;
    }
  
    // 4. Ensure non-negative integer
    return Math.max(0, Math.floor(score));
  }
  
  module.exports = { calculateLeadScore };
  