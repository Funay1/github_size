const githubService = require('../services/github');
const githubHelper = require('../utils/githubHelper');
const stringUtils = require('../utils/string');
async function getLinesAndSizeFromGithubRepository(req, res) {
  try {
    const { username } = req.query;
    if (!username) res.status(400).send({ message: 'Missing repository' });
    const { data } = await githubService.getInitialPage(username);
    const repositories = githubHelper.getRepositoriesFromPage(username, data);
    console.log(repositories);
    const pagesContent = await Promise.all(
      repositories.map((e) => githubService.getPageContent(e))
    );
    // const files = githubHelper.getFilesFromPage(username, pagesContent[0].data);
    // const folders = githubHelper.getFoldersFromPage(username, pagesContent[0].data);
    // return res.status(200).send(folders.map(e=>stringUtils.getHref(e)));
    res.status(200).send({ message: 'tudo certo por aqui' });
  } catch (e) {
    res.status(500).json({ message: 'Internal error', teste: e });
  }
}
module.exports = Object.freeze({
  getLinesAndSizeFromGithubRepository
});
