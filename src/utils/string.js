const { REGEX_HREF, REGEX_LINES, REGEX_SIZE } = require('../constants');

const uppercaseFirstLetter = (string) =>
  string.charAt(0).toUpperCase() + string.slice(1, string.length);

const getHref = (string) =>
  new RegExp(REGEX_HREF).exec(string)[0].split('"')[1];

const getFileExtension = (string) => string.match(/\.[0-9a-z]+$/i)[0];

const getSize = (string) => new RegExp(REGEX_SIZE, 's').exec(string)[0];

function getLines(string) {
  const regex = new RegExp(REGEX_LINES);
  const result = regex.exec(string);
  return (result && result[0].split(' ')[0]) || 0;
}

function convertFileSize(value, type) {
  value = parseFloat(value);
  if (type.trim() === 'Bytes') return value;
  if (type.trim() === 'KB') return value * 1000;
  if (type.trim() === 'MB') return value * 1000000;
  if (type.trim() === 'GB') return value * 1000000000;
  console.log('invalid type', value, type);
  return 0;
}
module.exports = Object.freeze({
  uppercaseFirstLetter,
  getHref,
  getSize,
  getLines,
  getFileExtension,
  convertFileSize
});
