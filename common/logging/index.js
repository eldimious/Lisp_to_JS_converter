const winston = require('winston');
const expressWinston = require('express-winston');

const getFormat = () => winston.format.combine(
  winston.format.colorize(),
  winston.format.json(),
);

const getTransports = () => {
  const transports = [
    new winston.transports.Console({
      colorize: true,
    }),
  ];
  return transports;
};


const requestLogger = expressWinston.logger({
  level: 'info',
  transports: getTransports(),
  format: getFormat(),
  colorize: false,
  meta: true,
});


const errorLogger = expressWinston.errorLogger({
  level: 'error',
  transports: getTransports(),
  format: getFormat(),
});

const logger = winston.createLogger({
  level: process.env.NODE_ENV !== 'production' ? 'verbose' : 'info',
  format: getFormat(),
  transports: getTransports(),
});

module.exports = {
  requestLogger,
  errorLogger,
  raw: logger,
  error: logger.error.bind(logger),
  warn: logger.warn.bind(logger),
  info: logger.info.bind(logger),
  log: logger.log.bind(logger),
  verbose: logger.verbose.bind(logger),
  debug: logger.debug.bind(logger),
  silly: logger.silly.bind(logger),
};
