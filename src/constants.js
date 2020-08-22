// GITHUB URL CONSTANTS
const GITHUB_URL = 'https://github.com/';
const GET_REPO_QUERY_STRING = '?tab=repositories';

// REGEX CONSTANTS
const REGEX_BLOB_FILES = '<a .*blob.*</a>';
const REGEX_FOLDER = '<a .*tree.*>.*[^Permalink]+.*</a>';
const REGEX_URL_REPO = '/([^"|^<|^ |/])+';
const REGEX_HREF = 'href=".*"';

module.exports = Object.freeze({
  GITHUB_URL,
  GET_REPO_QUERY_STRING,
  REGEX_BLOB_FILES,
  REGEX_FOLDER,
  REGEX_URL_REPO,
  REGEX_HREF
});