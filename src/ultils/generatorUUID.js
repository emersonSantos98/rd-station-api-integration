const { v4: uuidv4 } = require('uuid');

exports.generateUUID = function () {
  return uuidv4();
};
