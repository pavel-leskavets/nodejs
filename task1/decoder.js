const { upperCaseStart, upperCaseEnd, lowerCaseStart } = require('./constants');
const getNewSymbol = require('./symbolHelper');

module.exports = function decoder(chunk, shift) {
  let str = '';
  chunk.split('').forEach(item => {
    const symbolCode = item.charCodeAt(0);
    if (item.match(/[a-z]/i)) {
      str +=
        symbolCode >= upperCaseStart && symbolCode <= upperCaseEnd
          ? getNewSymbol(symbolCode, upperCaseStart, shift)
          : getNewSymbol(symbolCode, lowerCaseStart, shift);
    } else {
      str += item;
    }
  });
  return str;
};
