const errors = require('../../common/errors');
const {
  LEFT_PARETHENSIS,
  RIGHT_PARETHENSIS,
  IDENT,
  EOF,
} = require('../../common/utils');


function init({ input }) {
  const lispString = input;
  let line = 1;
  let column = 1;
  let token = '';
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
      return EOF;
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
    column += 1;
    return getCharacter();
  }

  function findSpace() {
    while (isSpace(getCharacter())) {
      getNextCharacter();
    }
  }

  function findIdent() {
    let char = getCharacter();
    token = '';
    while (char !== EOF && char.match(/[a-z\-\.]/)) {
      token += char;
      char = getCharacter();
      getNextCharacter();
    }
    return token;
  }

  function getLexers() {
    let char = getCharacter();
    while (char !== EOF) {
      char = getCharacter();
      if (char === LEFT_PARETHENSIS) {
        getNextCharacter();
        return ['LEFT_PARETHENSIS', LEFT_PARETHENSIS];
      } else if (char === RIGHT_PARETHENSIS) {
        getNextCharacter();
        return ['RIGHT_PARETHENSIS', RIGHT_PARETHENSIS];
      } else if (char.match(/[a-z\-\.]/)) {
        return ['IDENT', findIdent()];
      } else if (isSpace(char)) {
        findSpace();
      } else {
        return EOF;
      }
    }
    return EOF;
  }

  return {
    getLexers,
  };
}


module.exports = init;