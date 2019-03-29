const parserService = require('../parser');
const {
  mapLispOperatorsToJSOperators,
  shouldAddParethensis,
} = require('../../common/utils');

function init() {
  function compile(root) {
    if (!shouldAddParethensis(root[0])) {
      return `(${root})`;
    }
    const operators = mapLispOperatorsToJSOperators();
    switch (root[0]) {
      case 'defvar':
      case 'defconstant':
      case 'if':
      case 'defun':
        switch (root[0]) {
          case 'defvar':
            return compileDefineExpression(root);
          case 'defconstant':
            return compileDefineConstantExpression(root);
          case 'if':
            return compileIfExpression(root);
          case 'defun':
            return compileFunctionExpression(root);
        }
      case '=':
      case 'and':
      case 'mod':
      case 'incf':
      case 'decf':
      case '*':
      case '/':
      case 'or':
      case '+':
      case '-':
        return compileOperatorExpression(root, operators[root[0]]);
      default:
        return `${root[0]}(${[[], ...root.slice(1)].map(n => compile(n)).join(', ')})`;
    }
  }

  function compileDefineExpression(node) {
    return `let ${node[1]} = ${compile(node[2])};`;
  }

  function compileDefineConstantExpression(node) {
    return `const ${node[1]} = ${compile(node[2])};`;
  }

  function compileIfExpression(node) {
    if (node.length < 3) {
      console.log("if form requires 3 elements");
      return;
    }
    let output = '';
    output += '(function() { ';
    output += `if (${compile(node[1])}) { return ${compile(node[2])}; } `;
    if (node.length === 4) {
      output += `else { return ${compile(node[3])}} `;
    }
    output += '})()';
    return output;
  }

  function compileFunctionExpression(node) {
    if (node.length < 4) {
      console.log("if form requires 4 elements");
      return;
    }
    const fnName = node[1];
    const params = node[2].slice(0).join(', ');
    const body = node[3];
    return `function ${fnName}(${params}) { return ${compile(body)}; }`;
  }

  function compileOperatorExpression(node, op) {
    const el = [...[], ...node.slice(1)].map(n => compile(n)).join(` ${op} `);
    return `(${el})`;
  }

  function start(input) {
    const parser = parserService();
    const parsedArray = parser.parse(input);
    console.log('ast', parsedArray)
    console.log('ast', parsedArray.length)
    let output = '';
    for (let i = 0; i < parsedArray.length; i++) {
      console.log('i', parsedArray[i])
      console.log('aaa', compile(parsedArray[i]));
      output += compile(parsedArray[i]);
    }
    return output;
  }
  return {
    start,
  };
}


module.exports = init;
