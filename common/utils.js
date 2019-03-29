const LEFT_PARETHENSIS = '(';
const RIGHT_PARETHENSIS = ')';
const CHARACTER = 'CHARACTER';
const STOP_COMPILE = null;

function mapLispOperatorsToJSOperators() {
  return {
    '+': '+',
    '*': '*',
    '/': '/',
    '-': '-',
    mod: '%',
    incf: '+',
    decf: '-',
    '=': '===',
    and: '&&',
    or: '||',
  };
}

function shouldAddParethensis(el) {
  return !(el !== '='
    && el !== 'and'
    && el !== 'mod'
    && el !== 'incf'
    && el !== 'decf'
    && el !== 'or'
    && el !== '+'
    && el !== '-'
    && el !== '*'
    && el !== '/'
    && el !== 'defvar'
    && el !== 'defconstant'
    && el !== 'begin'
    && el !== 'if'
    && el !== 'defun'
  );
}


module.exports = {
  LEFT_PARETHENSIS,
  RIGHT_PARETHENSIS,
  CHARACTER,
  STOP_COMPILE,
  mapLispOperatorsToJSOperators,
  shouldAddParethensis,
};
