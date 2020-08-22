const axios = require('axios');
const { GITHUB_URL, GET_REPO_QUERY_STRING } = require('../constants');
const api = axios.create({
  baseURL: GITHUB_URL,
  withCredentials: false
});

function getInitialPage(userName) {
  if (!userName) throw new 'Username is required'();
  return api.get(`/${userName}${GET_REPO_QUERY_STRING}`);
}
function getPageContent(url) {
  if (!url) throw new 'Url is required'();
  return api.get(url);
}

module.exports = Object.freeze({
  getInitialPage,
  getPageContent
});
