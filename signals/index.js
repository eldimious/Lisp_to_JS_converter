const process = require('process');

const handleGracefulShutdown = (server, database) => {
  const errors = [];
  server.close(async () => {
    if (errors.length > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  });
};

module.exports = {
  handleGracefulShutdown,
};
