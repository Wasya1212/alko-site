const fs = require('fs');
const path = require('path');

const Router = require('@koa/router');

const renderPage = require('../utils/render-page');

const {
  pagesPaths: {
    home: homePagePath
  }
} = require('../config/public.json');

const router = new Router();

const HOME_PAGE = fs.readFileSync(path.resolve(__dirname, `../${homePagePath}`));

router.get('/', (ctx) => {
  ctx.body = renderPage(HOME_PAGE, { pageName: 'main' });
});

module.exports = router;