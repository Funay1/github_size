const axios = require('axios');
const { GITHUB_URL } = require('../constants');
const api = axios.create({
  baseURL: GITHUB_URL,
  withCredentials: false
});
function getPageContent(url, proxy = null) {
  if (!url) throw new 'Url is required'();
  return api.get(url, { proxy });
}

module.exports = Object.freeze({
  getPageContent
});
