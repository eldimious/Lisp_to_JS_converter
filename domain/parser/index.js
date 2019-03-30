const {
  STOP_COMPILE,
} = require('../../common/utils');
const lexerService = require('../lexer');

function init() {
  const lexerSrv = lexerService();
  function parse(input, initialNodes = [], initialElements = []) {
    const listLexers = lexerSrv.listLexers(input);
    let nodes = initialNodes;
    const elements = initialElements;
    if (listLexers !== STOP_COMPILE) {
      if (listLexers[0] === 'LEFT_PARETHENSIS') {
        const newNode = [];
        nodes.push(newNode);
        elements.push(nodes);
        nodes = newNode;
      } else if (listLexers[0] === 'RIGHT_PARETHENSIS') {
        nodes = elements.pop();
      } else {
        nodes.push(listLexers[1]);
      }
      return parse(input, nodes, elements);
    }
    return nodes;
  }

  return {
    parse,
  };
}


module.exports = init;
