'use strict';

const {Router} = require(`express`);
const {InstanceHttpApiService} = require(`../../lib/http-service`);

const searchRouter = new Router();

searchRouter.get(`/`, async (req, res) => {
  const {query} = req.query;

  if (query) {
    try {
      const results = await InstanceHttpApiService.getArticlesBySearch(query);
      res.render(`search`, {results});
    } catch (err) {
      res.render(`search`, {results: [], isEmpty: true});
    }
  } else {
    res.render(`search`);
  }
});

module.exports = {
  searchRouter
};
