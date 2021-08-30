const homeRouter = require('./home');
const newsRouter = require('./news');
const fansRouter = require('./fans');
const adminRouter = require('./admin');
const matchesRouter = require('./matches');
const contactsRouter = require('./contacts');

const routers = [
  homeRouter,
  newsRouter,
  fansRouter,
  adminRouter,
  matchesRouter,
  contactsRouter
];

module.exports = (app) => {
  for (const router of routers) {
    app.use(router.routes());
    app.use(router.allowedMethods());
  }
};