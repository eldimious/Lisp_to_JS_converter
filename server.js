const { httpPort } = require('./configuration');
const services = require('./domain')();
const app = require('./router/http/app')(services);
const logging = require('./common/logging');

const server = app.listen(httpPort, () => {
  logging.info(`Listening on *:${httpPort}`);
});
