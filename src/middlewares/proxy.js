const proxyService = require('../services/proxy');
const { MAX_PROXY_USERS } = require('../constants');
let proxyList = [];
let i = 0;
async function getProxy(req, res, next) {
  if(req.query.proxy == 'false') return next();
  if (proxyList.length === 0) proxyList = await proxyService.getProxyList();
  i = (i + 1) % MAX_PROXY_USERS;
  res.locals.proxy = proxyList[i];
  return next();
}
module.exports = getProxy;
