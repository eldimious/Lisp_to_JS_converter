const express = require('express');
const EndpointValidator = require('../../middleware/endpointValidator');

const endpointValidator = new EndpointValidator();
const router = express.Router({ mergeParams: true });

function init({
  compilerService,
}) {
  router.post('/isValidLisp', (...args) => endpointValidator.requireValidLispInput(...args), (req, res) => {
    return res.send({
      data: 'Correct LISP input',
    });
  });

  router.post('/convertToJS', (...args) => endpointValidator.requireValidLispInput(...args), (req, res) => {
    const result = compilerService.start(req.body.input);
    return res.send({
      data: result,
    });
  });

  return router;
}

module.exports.init = init;
