const { REGEX_HREF } = require('../constants');
const uppercaseFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1, string.length);
const getHref = (string) =>
  new RegExp(REGEX_HREF).exec(string)[0].split('"')[1];

module.exports = Object.freeze({
  uppercaseFirstLetter,
  getHref
});
