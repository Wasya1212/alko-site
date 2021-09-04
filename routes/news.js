const fs = require('fs');
const path = require('path');

const Router = require('@koa/router');

const renderPage = require('../utils/render-page');

const newsController = require('../controllers/news');

const {
  pagesPaths: {
    news: newsPagePath
  }
} = require('../config/public.json');

const router = new Router();

const NEWS_PAGE = fs.readFileSync(path.resolve(__dirname, `../${newsPagePath}`));

router.get('/news', async (ctx) => {
  const news = await newsController.getAllNews();
  ctx.body = renderPage(NEWS_PAGE, { pageName: 'news', news });
});

router.post('/news/create', async (ctx, next) => {
  if (!ctx.request.files || !ctx.request.body) {
    ctx.status = 400;
    return await next();
  }
  
  const newsData = Object.assign(
    { ...ctx.request.body },
    { image: ctx.request.files.image.path.match(/[^\\]+(?=\.).+/)[0] }
  );
  const newNews = await newsController.createNews(newsData);
  
  ctx.body = newNews;
  
  await next();
});

module.exports = router;