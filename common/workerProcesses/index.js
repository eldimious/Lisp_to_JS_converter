const cluster = require('cluster');
const os = require('os');
const logging = require('../logging');

/**
 * Setup number of worker processes to share port which will be defined while setting up server
 */
const setupWorkerProcesses = () => {
  const numCores = os.cpus().length;
  const workers = [];
  logging.info(`Master cluster setting up ${numCores} workers`);

  for (let i = 0; i < numCores; i++) {
    workers.push(cluster.fork());
    workers[i].on('message', message => logging.info(`worker message: ${message}`));
  }
  cluster.on('online', worker => logging.info(`Worker ${worker.process.pid} is online`));
  cluster.on('listening', worker => logging.info(`Worker ${worker.process.pid} is listening`));
  cluster.on('exit', (worker, code, signal) => {
    logging.info(`Worker ${worker.process.pid} died with code: ${code} and signal: ${signal}`);
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      logging.info('Starting a new worker');
      const newWorker = cluster.fork();
      workers.push(newWorker);
      workers[workers.length - 1].on('message', message => logging.info(`worker message: ${message}`));
    }
  });
};

module.exports = setupWorkerProcesses;