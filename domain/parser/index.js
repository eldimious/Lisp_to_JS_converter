const {
  EOF,
} = require('../../common/utils');
const lexerService = require('../lexer');

function init() {
  function parse(input) {
    const lexer = lexerService(input);
    let token = lexer.listLexers();
    let form = [];
    const stack = [];
    while (token !== EOF) {
      switch (token[0]) {
        case 'LEFT_PARETHENSIS':
          console.log('LEFT_PARETHENSIS')
          let newform = [];
          form.push(newform);
          stack.push(form);
          form = newform;
          token = lexer.listLexers()
          break;
        case 'RIGHT_PARETHENSIS':
          console.log('RIGHT_PARETHENSIS')
          form = stack.pop();
          token = lexer.listLexers()
          break;
        default:
          console.log('default')
          form.push(token[1]);
          token = lexer.listLexers()
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
