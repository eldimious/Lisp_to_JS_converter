/* eslint-disable new-cap */
const express = require('express');
const {
  validateLispInput,
} = require('../../middleware/endpointValidator');

const router = express.Router({ mergeParams: true });

function init({
  compilerService,
}) {
  router.post(
    '/isValidLisp',
    validateLispInput(),
    (req, res) => res.send({
      data: 'Correct LISP input',
    }));

  router.post(
    '/convertToJS',
    validateLispInput(),
    (req, res) => {
      const result = compilerService.start(req.body.input);
      return res.send({
        data: result,
      });
    });

  return router;
}

module.exports.init = init;
