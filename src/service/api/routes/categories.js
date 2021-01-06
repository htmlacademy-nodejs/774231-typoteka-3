'use strict';

const {Router} = require(`express`);
const {HttpCode} = require(`../../constants`);

const categoriesRouter = new Router();

module.exports = (appRouter, service) => {
  appRouter.use(`/categories`, categoriesRouter);

  categoriesRouter.get(`/`, (_, res) => {
    const categories = service.findAll();
    return res.status(HttpCode.OK).json(categories);
  });
};
