const errors = require('../../common/errors');
const {
  EOF,
} = require('../../common/utils');
const _ = require("underscore");
const parserService = require('../parser');

function init() {
  let output = '';

  function compile(root) {
    if (!root[0]) {
      return "" + root + "";
    }
    switch (root[0]) {
      case 'define':
      case 'begin':
      case 'if':
      case 'fn':
        switch (root[0]) {
          case 'compile_define_form':
            return compile_define_form(root);
          case 'compile_begin_form':
            return compile_begin_form(root);
          case 'compile_if_form':
            return compile_if_form(root);
          case 'compile_fn_form':
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
    var output = "";
    output += "var " + node[1] + " = " + compile(node[2]) + ";";
    return output;
  }

  function compile_begin_form(node) {
    var forms = _.map(node.slice(1), (n) => compiler.compile(n));
    forms[forms.length-1] = "return " + forms[forms.length-1];
    return "(function() { " + forms.join("; ") + "})()";
  }

  function compile_if_form(node) {
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
    var output = "function(" + node[1].slice(0).join(", ") + ") { return " + compile(node[2]) + "; }";
    return output;
  }

  function compile_binary_op(node, op) {
    var tests = _.map(node.slice(1), (n) => compile(n));
    return "(" + tests.join(" " + op + " ") + ")";
  }

  function compile_js_layer(node, form) {
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
