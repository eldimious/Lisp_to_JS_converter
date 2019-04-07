const process = require('process');

const handleGracefulShutdown = (server) => {
  const errors = [];
  server.close(async () => {
    process.exit(0);
  });
};

module.exports = {
  handleGracefulShutdown,
};
