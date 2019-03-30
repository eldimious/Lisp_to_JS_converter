const httpPort = process.env.PORT || 3000;
const services = require('./domain')();
const app = require('./router/http/app')(services);


const server = app.listen(httpPort, () => {
  console.info(`Listening on *:${httpPort}`);
});
