const fs = require('fs');
const path = require('path');

const Router = require('@koa/router');

const renderPage = require('../utils/render-page');

const {
  pagesPaths: {
    admin: adminPagePath
  }
} = require('../config/public.json');

const router = new Router();

const ADMIN_PAGE = fs.readFileSync(path.resolve(__dirname, `../${adminPagePath}`));

router.get('/admin', (ctx) => {
  ctx.body = renderPage(ADMIN_PAGE, { pageName: 'admin' });
});

module.exports = router;