const { encodeOperation, lettersInAlphabet } = require('./constants');

module.exports = function setShift(actionType, shift) {
  return actionType === encodeOperation ? +shift : lettersInAlphabet - shift;
};
