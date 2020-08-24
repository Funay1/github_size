const {
  REGEX_URL_REPO,
  REGEX_BLOB_FILES,
  REGEX_FOLDER
} = require('../constants');

const stringUtils = require('./string');
const { getPageContent } = require('../services/github');
const { convertFileSize } = require('../utils/string');

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
  return result.map((element) => stringUtils.getHref(element));
}

async function getLinesAndSizeFromFiles(files, proxy) {
  const filesContent = [];
  for (const file of files) {
    // console.log(file);
    const fileContent = await getPageContent(file, proxy);
    // console.log(fileContent);
    filesContent.push(fileContent);
  }
  const filesByType = {};
  files.forEach((e) => {
    filesByType[stringUtils.getFileExtension(e)] = {
      size: 0,
      lines: 0
    };
  });
  filesContent.forEach((e, i) => {
    const size = stringUtils.getSize(e.data);
    filesByType[stringUtils.getFileExtension(files[i])].size += convertFileSize(
      size.split(' ')[0], size.split(' ')[1]
    );
    filesByType[stringUtils.getFileExtension(files[i])].lines += parseInt(
      stringUtils.getLines(e.data)
    );
  });
  return filesByType;
}

/**
 * recursive function to search all files inside a specific folder.
 * @param {string} username
 * @param {string} pageContent
 * @param {object} proxy
 * @param {array} blacklist
 * @returns {string} return all files inside folder from pageContent
 */
async function searchAllFilesHTMLElementsOnRepository(
  username,
  pageContent,
  proxy,
  blacklist = []
) {
  let filesHtmlElements = getFilesFromPage(username, pageContent);
  const hrefFolders = getFoldersFromPage(username, pageContent);
  const foldersContent = [];
  // get page content of folders that are not on the blacklist
  // the black list is folders searched before
  // i don't use promise.all to github don't block the requests.
  for (const folder of hrefFolders) {
    if (blacklist.find((e) => e === folder)) continue;
    blacklist.push(folder);
    const newPageContent = await getPageContent(folder);
    foldersContent.push(newPageContent);
  }
  // get all files html elements from all child folders
  for (const folderContent of foldersContent) {
    let filesAux;
    filesAux = await searchAllFilesHTMLElementsOnRepository(
      username,
      folderContent.data,
      proxy,
      blacklist
    );
    filesHtmlElements = filesHtmlElements.concat(filesAux);
  }
  return filesHtmlElements;
}
module.exports = {
  getFilesFromPage,
  getRepositoriesFromPage,
  getFoldersFromPage,
  getLinesAndSizeFromFiles,
  searchAllFilesHTMLElementsOnRepository
};
