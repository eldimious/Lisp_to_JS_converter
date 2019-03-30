const parserService = require('../parser');
const {
  mapLispOperatorsToJSOperators,
  shouldAddParethensis,
  isOperator,
} = require('../../common/utils');
const errors = require('../../common/errors');

function init() {
  function compile(arr) {
    if (!shouldAddParethensis(arr[0])) {
      return `(${arr})`;
    }
    const operators = mapLispOperatorsToJSOperators();
    if (arr[0] === 'defvar') {
      return compileDefineExpression(arr);
    } else if (arr[0] === 'defconstant') {
      return compileDefineConstantExpression(arr);
    } else if (arr[0] === 'defun') {
      return compileFunctionExpression(arr);
    } else if (arr[0] === 'if') {
      return compileIfExpression(arr);
    } else if (isOperator(arr[0])) {
      return compileOperatorExpression(arr, operators[arr[0]]);
    }
    return `${arr[0]}(${[[], ...arr.slice(1)].map(n => compile(n)).join(', ')})`;
  }

  function compileDefineExpression(elements) {
    return `let ${elements[1]} = ${compile(elements[2])};`;
  }

  function compileDefineConstantExpression(elements) {
    return `const ${elements[1]} = ${compile(elements[2])};`;
  }

  function compileIfExpression(elements) {
    if (elements.length < 3) {
      throw new errors.BadRequest('If block requires 3 elements');
    }
    let output = '';
    output += '(function() { ';
    output += `if (${compile(elements[1])}) { return ${compile(elements[2])}; } `;
    if (elements.length === 4) {
      output += `else { return ${compile(elements[3])}} `;
    }
    output += '})()';
    return output;
  }

  function compileFunctionExpression(elements) {
    if (elements.length < 4) {
      throw new errors.BadRequest('Function declaration requires 4 elements');
    }
    const fnName = elements[1];
    const params = elements[2].slice(0).join(', ');
    const body = elements[3];
    return `function ${fnName}(${params}) { return ${compile(body)}; }`;
  }

  function compileOperatorExpression(elements, op) {
    const el = [...[], ...elements.slice(1)].map(n => compile(n)).join(` ${op} `);
    return `(${el})`;
  }

  function start(input) {
    try {
      const parser = parserService();
      const parsedArray = parser.parse(input);
      return parsedArray
        .reduce((acc, currentValue) => acc + compile(currentValue), '');
    } catch (error) {
      throw error;
    }
  }
  return {
    start,
  };
}


module.exports = init;
