'use strict';

const {Router} = require(`express`);
const CategoriesService = require(`../data-service/categories`);
const SearchService = require(`../data-service/search`);
const ArticlesService = require(`../data-service/articles`);
const getFileData = require(`../lib/read-file-data`);
const categoriesRouter = require(`./routes/categories`);
const articlesRouter = require(`./routes/articles`);
const searchRouter = require(`./routes/search`);

const appRouter = new Router();

(async () => {
  const data = await getFileData();

  categoriesRouter(appRouter, new CategoriesService(data));
  searchRouter(appRouter, new SearchService(data));
  articlesRouter(appRouter, new ArticlesService(data));
})();

module.exports = {
  appRouter,
};
