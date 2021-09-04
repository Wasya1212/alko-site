const News = require('../models/news');

module.exports = {
  createNews: async (newsData) => 
    await new News(newsData).save(),

  getAllNews: async () => 
    await News.find()
};