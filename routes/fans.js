const fs = require('fs');
const path = require('path');

const Router = require('@koa/router');

const renderPage = require('../utils/render-page');

const {
  pagesPaths: {
    fans: fansPagePath
  }
} = require('../config/public.json');

const router = new Router();

const FANS_PAGE = fs.readFileSync(path.resolve(__dirname, `../${fansPagePath}`));

router.get('/fans', (ctx) => {
  ctx.body = renderPage(FANS_PAGE, { pageName: 'fans' });
});

module.exports = router;