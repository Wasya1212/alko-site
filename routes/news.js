const fs = require('fs');
const path = require('path');

const Router = require('@koa/router');

const renderPage = require('../utils/render-page');

const {
  pagesPaths: {
    news: newsPagePath
  }
} = require('../config/public.json');

const router = new Router();

const NEWS_PAGE = fs.readFileSync(path.resolve(__dirname, `../${newsPagePath}`));

router.get('/news', (ctx) => {
  ctx.body = renderPage(NEWS_PAGE);
});

module.exports = router;