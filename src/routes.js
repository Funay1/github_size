const express = require('express');
const routes = new express.Router();
const githubController = require('./controller/github');

routes.get('/github/getRepository', githubController.getLinesAndSizeFromGithubRepository);

module.exports = routes;
