const Feedback = require('../models/feedback');

module.exports = {
  createFeedback: async (feedbackData) => 
    await new Feedback(feedbackData).save(),
  
  getAllFeedbacks: async () => 
    await Feedback.find()
};