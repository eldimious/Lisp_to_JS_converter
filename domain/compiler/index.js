const errors = require('../../common/errors');
const {
  EOF,
} = require('../../common/utils');
const _ = require("underscore");
const parserService = require('../parser');

function init() {
  function shouldAddParen(el) {
    return !(
      el !== "equals"
      && el !== "and"
      && el !=="or" 
      && el !=="add"
      && el !=="sub" 
      && el !=="define"
      && el !=="begin"
      && el !=="if"
      && el !=="fn")
  }
  function compile(root) {
    if (!shouldAddParen(root[0])) {
      return "(" + root + ")";
    }
    switch (root[0]) {
      case 'define':
      case 'begin':
      case 'if':
      case 'fn':
        console.log('root[0]', root[0])
        switch (root[0]) {
          case 'define':
            return compile_define_form(root);
          case 'begin':
            return compile_begin_form(root);
          case 'if':
            return compile_if_form(root);
          case 'fn':
            return compile_fn_form(root); 
        }
      case 'equals':
      case 'and':
      case 'or':
      case 'add':
      case 'sub':
        var table = {equals: "===", and: "&&", or: "||", add: "+", sub: "-"};
        return compile_binary_op(root, table[root[0]]);
      case '.':
        return compile_js_layer(root, root[0]);
      default:
        return `${root[0]}(${[[], ...root.slice(1)].map(n => compile(n)).join(', ')})`;
    }
  }

  function compile_define_form(node) {
    console.log('compile_define_form SOSTO')
    return `let ${node[1]} = ${compile(node[2])};`
  }

  function compile_begin_form(node) {
    console.log('compile_begin_form')
    var forms = _.map(node.slice(1), (n) => compiler.compile(n));
    forms[forms.length-1] = "return " + forms[forms.length-1];
    return "(function() { " + forms.join("; ") + "})()";
  }

  function compile_if_form(node) {
    console.log('compile_if_form')
    if (node.length < 3) {
      console.log("if form requires 3 elements");
      return;
    }
    var output = "";
    output += "(function() { ";
    output += "if (" + compile(node[1]) + ") { return " + compile(node[2]) + "; } ";
    if (node.length == 4) {
      output += "else { return " + compile(node[3]) + "} ";
    }
    output += "})()";
    return output;
  }

  function compile_fn_form(node) {
    console.log('compile_fn_form')
    var output = "function(" + node[1].slice(0).join(", ") + ") { return " + compile(node[2]) + "; }";
    return output;
  }

  function compile_binary_op(node, op) {
    console.log('compile_binary_op')
    console.log('SOSTO')
    const el = [...[], ...node.slice(1)].map(n => compile(n)).join(` ${op} `);
    return `(${el})`;
  }

  function compile_js_layer(node, form) {
    console.log('compile_js_layer')
    return compile(node[2]) + "." + compile(node[1]);
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
