const http = require('http');
const express = require('express');
const cors = require('cors');
const compress = require('compression')();
const bodyParser = require('body-parser');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
const expressValidator = require('express-validator');
const lispRoutes = require('./routes/lisp');
const errorRoute = require('./routes/errors');
const EndpointValidator = require('./middleware/endpointValidator');

const endpointValidator = new EndpointValidator();
const app = express();

app.disable('x-powered-by');
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(compress);
app.use(logger('dev'));
app.use(cors());
app.use(expressValidator(endpointValidator.settings));


module.exports = (services) => {
  app.use(express.static(path.join(__dirname, 'public')));
  app.use('/api/v1', lispRoutes.init(services));
  app.use(errorRoute);

  const httpServer = http.createServer(app);
  return httpServer;
};
