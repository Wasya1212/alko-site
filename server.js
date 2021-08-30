const Koa = require('koa');

const logger = require('./middleware/logger');
const serve = require('./middleware/serve');

const initRoutes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = new Koa();

app.use(logger);
app.use(serve);

initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server work on port: ${PORT}`);
});