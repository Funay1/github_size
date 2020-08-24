// GITHUB URL CONSTANTS
const GITHUB_URL = 'https://github.com/';

// REGEX CONSTANTS
const REGEX_BLOB_FILES = '<a .*blob.*</a>';
const REGEX_FOLDER = '<a .*tree.*>.*[^Permalink]+.*</a>';
const REGEX_URL_REPO = '/([^"|^<|^ |/])+';
const REGEX_HREF = 'href=".*"';
const REGEX_LINES = '([0-9]+ lines)';
// eslint-disable-next-line no-useless-escape
const REGEX_SIZE = '[0-9]+.?[0-9]+ (Bytes|KB|MB|GB)';

// proxy constants
const MAX_PROXY_USERS = 100;

module.exports = Object.freeze({
  GITHUB_URL,
  REGEX_BLOB_FILES,
  REGEX_FOLDER,
  REGEX_URL_REPO,
  REGEX_HREF,
  REGEX_LINES,
  REGEX_SIZE,
  MAX_PROXY_USERS
});
