const proxyService = require('../services/proxy');
const { MAX_PROXY_USERS } = require('../constants');
let proxyList = [];
let i = 0;
let lastRefresh = new Date();
async function getProxy(req, res, next) {
  if(req.query.proxy == 'false') return next();
  // this is used to refresh proxy list every 5 minutes (because the website used is not trustworthy)
  if(Math.abs(new Date() - lastRefresh)/(1000 * 60) > 5) {
    lastRefresh = new Date();
    proxyList = await proxyService.getProxyList();
  }
  // get a list of proxy in the first request
  if (proxyList.length === 0) proxyList = await proxyService.getProxyList();
  i = (i + 1) % MAX_PROXY_USERS; // circular logic to get proxy
  res.locals.proxy = proxyList[i];
  return next();
}
module.exports = getProxy;
