const path = require('path');
const pug = require('pug');

const PUG_OPTIONS = {
  filename: path.resolve(__dirname, '../views/views')
};

const renderPage = (page, locals) => {
  return pug.compile(page, PUG_OPTIONS)(locals || {});
};

module.exports = renderPage;