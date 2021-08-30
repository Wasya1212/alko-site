const path = require('path');

const Serve = require('koa-static');

const { staticFilesPath } = require('../config/public.json');

const serve = Serve(path.resolve(__dirname, `../${staticFilesPath}`));

module.exports = serve;