const Koa = require('koa');

const createDatabaseConnection = require('./db/mongoose');

const logger = require('./middleware/logger');
const serve = require('./middleware/serve');
const bodyparser = require('./middleware/bodyparser');

const initRoutes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = new Koa();

createDatabaseConnection(() => {
  console.log('connected to mongodb');
}, () => {
  console.log('disconnected from mongodb');
});

app.use(logger);
app.use(serve);
app.use(bodyparser);

initRoutes(app);

app.listen(PORT, () => {
  console.log(`Server work on port: ${PORT}`);
});