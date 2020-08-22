const {
  REGEX_URL_REPO,
  REGEX_BLOB_FILES,
  REGEX_FOLDER
} = require('../constants');
const stringUtils = require('./string');
function getRepositoriesFromPage(userName, pageContent) {
  userName = stringUtils.uppercaseFirstLetter(userName);
  const regex = new RegExp(`/${userName}${REGEX_URL_REPO}`, 'g');
  const result = {};
  let regexResult;
  while ((regexResult = regex.exec(pageContent)) !== null) {
    result[regexResult[0]] = '';
  }
  return Object.keys(result);
}

function getFilesFromPage(username, pageContent) {
  const regex = new RegExp(REGEX_BLOB_FILES, 'g');
  console.log(pageContent);
  let regexResult;
  const result = [];
  while ((regexResult = regex.exec(pageContent)) !== null) {
    result.push(regexResult[0]);
  }
  return result;
}
function getFoldersFromPage(username, pageContent) {
  const regex = new RegExp(REGEX_FOLDER, 'g');
  let regexResult;
  const result = [];
  while ((regexResult = regex.exec(pageContent)) !== null) {
    result.push(regexResult[0]);
  }
  return result;
}
module.exports = {
  getFilesFromPage,
  getRepositoriesFromPage,
  getFoldersFromPage
};
