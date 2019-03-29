const errorHandler = require('../routes/errors');
const errors = require('../../../common/errors');
const {
  listLispReservedWords,
} = require('../../../common/utils');

module.exports = class EndpointValidator {
  constructor() {
    this._settings = {
      customValidators: {
        isInArray(item, array) {
          return array.includes(item);
        },
        startsWithAny(arr, str) {
          return arr.some(el => str.startsWith(el));
        },
        startsWith(str, check) {
          return str.startsWith(check);
        },
        endsWith(str, check) {
          return str.endsWith(check);
        },
      },
    };
  }

  get settings() {
    return this._settings;
  }

  set settings(newSettings) {
    this._settings = newSettings;
  }

  requireValidLispInput(req, res, next) {
    req.checkBody('input', 'Input in body params required').notEmpty();
    req.checkBody('input', 'Input should start with (.').startsWith('(');
    req.checkBody('input', 'Input should end with ).').endsWith(')');
    req.getValidationResult().then((result) => {
      if (!result.isEmpty()) {
        return errorHandler(new errors.Forbidden(`${result.array({ onlyFirstError: true })[0].msg}`), req, res, next);
      }
      const subString = req.body.input.substring(req.body.input.indexOf('(') + 1);
      if (!this.settings.customValidators.startsWithAny(listLispReservedWords(), subString)) {
        return errorHandler(new errors.BadRequest(400, 'You should add a valid lisp input.'), req, res, next);
      }
      return next();
    });
  }
};
