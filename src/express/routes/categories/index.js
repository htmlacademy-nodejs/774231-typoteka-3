'use strict';

const {Router} = require(`express`);

const categoriesRouter = new Router();

categoriesRouter.get(`/`, (req, res) => {
  res.send(req.originalUrl);
});

module.exports = {
  categoriesRouter,
};
