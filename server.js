const cluster = require('cluster');
const { httpPort } = require('./configuration');
const services = require('./services')();
const setupWorkerProcesses = require('./common/workerProcesses');
const app = require('./router/http/app')(services);
const logging = require('./common/logging');
const {
  handleGracefulShutdown,
} = require('./signals');

let server;

((isClusterRequired) => {
  if (isClusterRequired && cluster.isMaster) {
    setupWorkerProcesses();
  } else {
    server = app.listen(httpPort, () => {
      logging.info(`Listening on *:${httpPort}`);
    });
  }
})(true);

process.on('SIGINT', () => {
  handleGracefulShutdown(server);
});


process.on('SIGTERM', () => {
  handleGracefulShutdown(server);
});
