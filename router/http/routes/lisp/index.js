const express = require('express');

const router = express.Router({ mergeParams: true });

function init({ authService }) {
  router.post('isValidLisp', (req, res) => {
    const result = authService.register({
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    });
    return res.send({
      data: result,
    });
  });

  router.post('convertToJS', (req, res) => {
    const result = authService.login({
      email: req.body.email,
      password: req.body.password,
    });
    return res.send({
      data: {
        token: result.token,
        user: result.user,
      },
    });
  });

  return router;
}


module.exports.init = init;
