const LEFT_PARETHENSIS = '(';
const RIGHT_PARETHENSIS = ')';
const IDENT = 'IDENT';
const EOF = -1;

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

module.exports = {
  LEFT_PARETHENSIS,
  RIGHT_PARETHENSIS,
  IDENT,
  EOF,
  mapLispOperatorsToJSOperators,
};
