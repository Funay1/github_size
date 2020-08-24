const express = require('express');
const routes = new express.Router();
const githubController = require('./controller/github');
const getProxy = require('./middlewares/proxy');
routes.get(
  '/github/getRepository',
  getProxy,
  githubController.getLinesAndSizeFromGithubRepository
);

module.exports = routes;
