const LEFT_PARETHENSIS = '(';
const RIGHT_PARETHENSIS = ')';
const CHARACTER = 'CHARACTER';
const STOP_COMPILE = null;

function regexSupportedChars() {
  return /[a-z0-9\-+=*><\/\\.]/;
}

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
    '>': '>',
    '/=': '!==',
    '<': '<',
    '<=': '<=',
    '>=': '>=',
    and: '&&',
    or: '||',
  };
}

function listLispOperators() {
  return [
    'and',
    'mod',
    'incf',
    'decf',
    '=',
    '>',
    '<',
    '<=',
    '>=',
    '+',
    '-',
    '*',
    '/',
    '/=',
  ];
}

function isOperator(el) {
  return listLispOperators().includes(el);
}

function listLispReservedWords() {
  return [
    'defvar',
    'defconstant',
    'if',
    'defun',
  ];
}

function shouldAddParethensis(el) {
  return ([...listLispReservedWords(), ...listLispOperators()]
    .includes(el)
  );
}


module.exports = {
  LEFT_PARETHENSIS,
  RIGHT_PARETHENSIS,
  CHARACTER,
  STOP_COMPILE,
  mapLispOperatorsToJSOperators,
  shouldAddParethensis,
  listLispReservedWords,
  listLispOperators,
  isOperator,
  regexSupportedChars,
};
