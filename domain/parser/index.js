const {
  STOP_COMPILE,
} = require('../../common/utils');
const lexerService = require('../lexer');

function init() {
  function parse(input) {
    const lexer = lexerService(input);
    let token = lexer.listLexers();
    let form = [];
    const stack = [];
    while (token !== STOP_COMPILE) {
      switch (token[0]) {
        case 'LEFT_PARETHENSIS':
          let newform = [];
          form.push(newform);
          stack.push(form);
          form = newform;
          token = lexer.listLexers();
          break;
        case 'RIGHT_PARETHENSIS':
          form = stack.pop();
          token = lexer.listLexers();
          break;
        default:
          form.push(token[1]);
          token = lexer.listLexers();
          break;
      }
    }
    return form;
  }

  return {
    parse,
  };
}


module.exports = init;
