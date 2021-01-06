'use strict';

const {HttpCode} = require(`../constants`);

module.exports = (service) => (req, res, next) => {
  const {articleId} = req.params;
  const post = service.findOne(articleId);

  if (!post) {
    return res.status(HttpCode.NOT_FOUND).send(`Not found post with id ${articleId}`);
  }

  res.locals.post = post;
  return next();
};
