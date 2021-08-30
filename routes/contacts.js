const fs = require('fs');
const path = require('path');

const Router = require('@koa/router');

const renderPage = require('../utils/render-page');

const {
  pagesPaths: {
    contacts: contactsPagePath
  }
} = require('../config/public.json');

const router = new Router();

const CONTACTS_PAGE = fs.readFileSync(path.resolve(__dirname, `../${contactsPagePath}`));

router.get('/contacts', (ctx) => {
  ctx.body = renderPage(CONTACTS_PAGE, { pageName: 'contacts' });
});

module.exports = router;