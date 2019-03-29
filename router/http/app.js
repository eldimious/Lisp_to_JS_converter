const http = require('http');
const express = require('express');
const cors = require('cors');
const compress = require('compression')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
const authRoutes = require('./routes/auth/routes');
const postsRoutes = require('./routes/posts/routes');
const usersRoutes = require('./routes/users/routes');
const errorRoute = require('./routes/errors');
const swaggerDocument = require('../../swagger');
const asyncWrapper = require('./utils/asyncWrapper');

const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(compress);
app.use(logger('dev'));
app.use(cors());

module.exports = (services) => {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/posts', postsRoutes.init(services));
  app.use('/users', usersRoutes.init(services));
  app.use(errorRoute);

  const httpServer = http.createServer(app);
  return httpServer;
};
