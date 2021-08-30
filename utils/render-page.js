const pug = require('pug');

const PUG_OPTIONS = {};

const renderPage = (page, locals) => {
  return pug.compile(page, PUG_OPTIONS)(locals || {});
};

module.exports = renderPage;