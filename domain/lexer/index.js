const {
  LEFT_PARETHENSIS,
  RIGHT_PARETHENSIS,
  STOP_COMPILE,
} = require('../../common/utils');


function init() {
  let lispInput = '';
  let line = 1;
  let column = 1;
  let pos = 0;

  function isSpace(char) {
    switch (char) {
      case ' ':
      case '\t':
      case '\n':
      case '\r':
        return true;
      default:
        return false;
    }
  }

  function getCharacter() {
    if (pos >= lispInput.length) {
      return STOP_COMPILE;
    }
    return lispInput.charAt(pos);
  }

  function getNextCharacter() {
    const character = getCharacter();
    if (character === '\r\n' || character === '\r' || character === '\n') {
      line += 1;
      column = 0;
    }
    pos += 1;
    column += column;
    return getCharacter();
  }

  function findSpace() {
    const char = getCharacter();
    if (isSpace(char)) {
      getNextCharacter();
      return findSpace();
    }
    return;
  }

  function findLexer(str) {
    const char = getCharacter();
    let output = str || '';
    if (char !== STOP_COMPILE && char.match(/[a-z0-9\-+=*\/\\.]/)) {
      output += char;
      getNextCharacter();
      return findLexer(output);
    }
    return str;
  }

  function listLexers(input) {
    lispInput = input;
    let char = getCharacter();
    while (char !== STOP_COMPILE) {
      if (char === LEFT_PARETHENSIS) {
        getNextCharacter();
        char = getCharacter();
        return ['LEFT_PARETHENSIS', LEFT_PARETHENSIS];
      } else if (char === RIGHT_PARETHENSIS) {
        getNextCharacter();
        char = getCharacter();
        return ['RIGHT_PARETHENSIS', RIGHT_PARETHENSIS];
      } else if (char.match(/[a-z0-9\-+=*\/\\.]/)) {
        char = getCharacter();
        return ['CHARACTER', findLexer()];
      } else if (isSpace(char)) {
        findSpace();
        char = getCharacter();
      } else {
        char = getCharacter();
        return STOP_COMPILE;
      }
    }
    return STOP_COMPILE;
  }

  return {
    listLexers,
  };
}

module.exports = init;
