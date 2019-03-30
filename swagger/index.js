const definitions = require('./definitions');
const info = require('./info');
const paths = require('./paths');
const components = require('./components');

let hostUrl = 'PROD_API_URL';

if (!process.env.NODE_ENV) {
  hostUrl = 'localhost:3000';
}

module.exports = {
  swagger: '2.0',
  info,
  host: hostUrl,
  basePath: '/',
  tags: [
    {
      name: 'Compiler',
      description: 'Endpoints for compiler',
    },
  ],
  schemes: [
    'http',
    'https',
  ],
  consumes: [
    'application/json',
  ],
  produces: [
    'application/json',
  ],
  paths: {
    '/isValidLisp': paths.isValidLisp,
    '/convertToJS': paths.convertToJS,
  },
  components,
  definitions: {
    Pagination: definitions.Pagination,
    Token: definitions.Token,
    Post: definitions.Post,
    User: definitions.User,
    401: definitions.Errors[401],
    400: definitions.Errors[400],
    404: definitions.Errors[404],
    500: definitions.Errors[500],
  },
};
