const parserService = require('../parser');
const {
  mapLispOperatorsToJSOperators,
} = require('../../common/utils');

function init() {
  function shouldAddParen(el) {
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

  function compile(root) {
    if (!shouldAddParen(root[0])) {
      return `(${root})`;
    }
    const operators = mapLispOperatorsToJSOperators();
    switch (root[0]) {
      case 'defvar':
      case 'defconstant':
      case 'begin':
      case 'if':
      case 'defun':
        switch (root[0]) {
          case 'defvar':
            return compileDefineExpression(root);
          case 'defconstant':
            return compileDefineConstantExpression(root);
          case 'begin':
            return compileBeginExpression(root);
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

  function compileBeginExpression(node) {
    console.log('compileBeginExpression')
    const elements = [...[], ...node.slice(1)].map(n => compile(n));
    elements[elements.length - 1] = `return ${elements[elements.length - 1]}`;
    return `(function() { ${elements.join('; ')}})()`;
  }

  function compileDefineExpression(node) {
    console.log('compileDefineExpression SOSTO')
    return `let ${node[1]} = ${compile(node[2])};`;
  }

  function compileDefineConstantExpression(node) {
    console.log('compileDefineConstantExpression SOSTO')
    return `const ${node[1]} = ${compile(node[2])};`;
  }

  function compileIfExpression(node) {
    console.log('compileIfExpression')
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
    output += '})();';
    return output;
  }

  function compileFunctionExpression(node) {
    const fnName = node[1];
    const params = node[2].slice(0).join(', ');
    const body = node[3];
    return `function ${fnName}(${params}) { return ${compile(body)}; }`
  }

  function compileOperatorExpression(node, op) {
    const el = [...[], ...node.slice(1)].map(n => compile(n)).join(` ${op} `);
    return `(${el})`;
  }

  function start(input) {
    const parser = parserService()
    console.log(parser)
    const ast = parser.parse(input);
    console.log('ast', ast)
    console.log('ast', ast.length)
    let output = '';
    for (let i = 0; i < ast.length; i++) {
      console.log('i', ast[i])
      //console.log('-- COMPILED FORM', i, '--');
      console.log('aaa', compile(ast[i]));
      output += compile(ast[i]);
    }
    return output
  }
  return {
    start,
  };
}


module.exports = init;
