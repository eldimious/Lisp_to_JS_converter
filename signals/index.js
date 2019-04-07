const process = require('process');

const handleGracefulShutdown = (server) => {
  if (server) {
    server.close(async () => {
      process.exit(0);
    });
  }
};

module.exports = {
  handleGracefulShutdown,
};
