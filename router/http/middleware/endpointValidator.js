const {
  body,
  param,
  validationResult,
} = require('express-validator');
const errorHandler = require('../routes/errors');
const errors = require('../../../common/errors');
const {
  listLispReservedWords,
  listLispOperators,
} = require('../../../common/utils');

const validate = (req, res, next) => {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const validationError = validationErrors.array({
    onlyFirstError: true,
  })[0];
  const errMsg = validationError?.msg?.message || 'Bad request';
  const errStatus = validationError?.msg?.status || 400;
  return errorHandler(new errors[errStatus](errMsg, 'BAD_BODY_PARAMS'), req, res, next);
};

const startsWithAny = (arr, str) => arr.some(el => str.startsWith(el));

const requireValidLispInput = () => [
  body('input')
    .exists()
    .notEmpty()
    .withMessage({
      message: 'input not provided. Make sure you have a "input" property in your body params.',
      status: 400,
    })
    .custom((value) => {
      if (value.startsWith('(')) {
        return true;
      }
      return false;

    })
    .withMessage(() => ({
      message: 'Input should start with (',
      status: 400,
    }))
    .custom((value) => {
      if (value.endsWith(')')) {
        return true;
      }
      return false;
    })
    .withMessage(() => ({
      message: 'Input should end with )',
      status: 400,
    }))
    .custom((value) => {
      const subString = value.substring(value.indexOf('(') + 1);
      if (startsWithAny([...listLispReservedWords(), ...listLispOperators()], subString)) {
        return true;
      }
      return false;
    })
    .withMessage(() => ({
      message: 'You should add a valid lisp input.',
      status: 400,
    })),
];

const validateLispInput = () => [
  requireValidLispInput(),
  validate,
];

module.exports = {
  validateLispInput,
};
