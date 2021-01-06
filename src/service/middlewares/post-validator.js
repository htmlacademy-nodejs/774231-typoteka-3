'use strict';

const validKeys = [`title`, `category`, `announce`, `fullText`, `createdDate`];
const {HttpCode} = require(`../constants`);

module.exports = (req, res, next) => {
  const post = req.body;
  const postKeys = Object.keys(post);
  const isValidKeys = validKeys.every((key) => postKeys.includes(key));

  if (!isValidKeys) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
