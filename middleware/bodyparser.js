const path = require('path');

const koaBody = require('koa-body');

const { uploadDir } = require('../config/upload.json');

const Bodyparser = koaBody({
  urlencoded: true,
  multipart: true,
  formLimit : 5 * 1024 * 1024,
  formidable: {
    uploadDir: path.resolve(__dirname, `../${uploadDir}`),
    keepExtensions: true
  }
});

module.exports = Bodyparser;