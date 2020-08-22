const Redis = require('ioredis');

let redis = null;
module.exports = (app) => {
  const { config } = app;

  if (!redis) {
    redis = new Redis({ ...config.redis });
  }

  return redis;
};
