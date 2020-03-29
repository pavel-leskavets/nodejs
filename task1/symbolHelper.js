const { lettersInAlphabet } = require('./constants');

module.exports = function getNewSymbol(code, codeStart, shift) {
  return String.fromCharCode(
    ((code - codeStart + shift) % lettersInAlphabet) + codeStart
  );
};
