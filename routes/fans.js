const fs = require('fs');
const path = require('path');

const Router = require('@koa/router');

const renderPage = require('../utils/render-page');

const feedbackController = require('../controllers/feedbacks');

const {
  pagesPaths: {
    fans: fansPagePath
  }
} = require('../config/public.json');

const router = new Router();

const FANS_PAGE = fs.readFileSync(path.resolve(__dirname, `../${fansPagePath}`));

router.get('/fans', async (ctx) => {
  const feedbacks = await feedbackController.getAllFeedbacks();
  ctx.body = renderPage(FANS_PAGE, { pageName: 'fans', feedbacks });
});

router.post('/fans/feedback/create', async (ctx, next) => {
  const feedbackData = ctx.request.body;
  console.log(typeof feedbackData)
  const newFeedback = await feedbackController.createFeedback(feedbackData);
  
  ctx.body = newFeedback;
  
  await next();
});

module.exports = router;