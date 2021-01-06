'use strict';

const {HttpCode} = require(`../constants`);
const validKeys = [`text`];

module.exports = (req, res, next) => {
  const comment = req.body;
  const commentKeys = Object.keys(comment);
  const isValidKeys = validKeys.every((key) => commentKeys.includes(key));

  if (!isValidKeys) {
    return res.status(HttpCode.BAD_REQUEST).send(`Bad request`);
  }

  return next();
};
