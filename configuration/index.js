/**
  * This module is used to collect all the configuration variables,
  * like the environment vars, in one place so they are not scattered all over the whole codebase
*/
require('dotenv').config();


const config = {
  httpPort: process.env.HTTP_PORT || 5000,
};

module.exports = config;
