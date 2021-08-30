const fs = require('fs');
const path = require('path');

const Router = require('@koa/router');

const renderPage = require('../utils/render-page');

const {
  pagesPaths: {
    matches: matchesPagePath
  }
} = require('../config/public.json');

const router = new Router();

const MATCHES_PAGE = fs.readFileSync(path.resolve(__dirname, `../${matchesPagePath}`));

router.get('/matches', (ctx) => {
  ctx.body = renderPage(MATCHES_PAGE, { pageName: 'matches' });
});

module.exports = router;