const githubService = require('../services/github');
const stringUtils = require('../utils/string');
const {
  getLinesAndSizeFromFiles,
  searchAllFilesHTMLElementsOnRepository
} = require('../utils/githubHelper');
const redis = {};

async function getLinesAndSizeFromGithubRepository(req, res) {
  try {
    const proxy = res.locals.proxy;
    const { repository, username } = req.query;
    if (!repository || !username)
      res.status(400).send({ message: 'Missing repository or username' });
    // check if this repository has been searched before and return last result
    if (redis[`${username}/${repository}`])
      return res
        .status(200)
        .send({ message: redis[`${username}/${repository}`] });
    // get a initial pageContent from repository
    const pageContent = await githubService.getPageContent(
      `${username}/${repository}`,
      proxy
    );
    let filesHtmlElements = await searchAllFilesHTMLElementsOnRepository(
      username,
      pageContent.data,
      proxy
    );
    const hrefFiles = filesHtmlElements.map((e) => stringUtils.getHref(e));
    const result = await getLinesAndSizeFromFiles(hrefFiles);
    // save on redis the result;
    redis[`${username}/${repository}`] = result;
    return res.status(200).send({ result });
  } catch (e) {
    console.log('errinho', e);
    res.status(500).json({ message: 'Internal error', teste: e });
  }
}
module.exports = Object.freeze({
  getLinesAndSizeFromGithubRepository
});
