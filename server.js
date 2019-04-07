const { httpPort } = require('./configuration');
const services = require('./services')();
const app = require('./router/http/app')(services);
const logging = require('./common/logging');
const {
  handleGracefulShutdown,
} = require('./signals');

const server = app.listen(httpPort, () => {
  logging.info(`Listening on *:${httpPort}`);
});

process.on('SIGINT', () => {
  handleGracefulShutdown(server);
});


process.on('SIGTERM', () => {
  handleGracefulShutdown(server);
});
