const {
  LEFT_PARETHENSIS,
  RIGHT_PARETHENSIS,
  STOP_COMPILE,
} = require('../../common/utils');


function init(input) {
  const lispString = input;
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
    if (pos >= lispString.length) {
      return STOP_COMPILE;
    }
    return lispString.charAt(pos);
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
    let char = getCharacter();
    while (isSpace(char)) {
      getNextCharacter();
      char = getCharacter();
    }
  }

  function findLexer() {
    let char = getCharacter();
    let str = '';
    while (char !== STOP_COMPILE && char.match(/[a-z0-9\-+=*\/\\.]/)) {
      str += char;
      getNextCharacter();
      char = getCharacter();
    }
    return str;
  }

  function listLexers() {
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
