const {
  STOP_COMPILE,
} = require('../../common/utils');
const lexerService = require('../lexer');

function init() {
  const lexerSrv = lexerService();
  function parse(input, initialNodes = [], initialElements = []) {
    const characters = lexerSrv.listCharacters(input);
    let nodes = initialNodes;
    const elements = initialElements;
    if (characters !== STOP_COMPILE) {
      if (characters[0] === 'LEFT_PARETHENSIS') {
        const newNode = [];
        nodes.push(newNode);
        elements.push(nodes);
        nodes = newNode;
      } else if (characters[0] === 'RIGHT_PARETHENSIS') {
        nodes = elements.pop();
      } else {
        nodes.push(characters[1]);
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
