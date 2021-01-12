'use strict';

const {DEFAULT_PORT, HttpCode, API_PREFIX} = require(`../constants`);
const {appRouter} = require(`../api`);
const express = require(`express`);
const {getLogger} = require(`../lib/logger`);

const logger = getLogger({name: `api`});

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();

    app.use(API_PREFIX, appRouter);

    app.use((req, res, next) => {
      logger.debug(`Request on route ${req.url}`);
      res.on(`finish`, () => {
        logger.info(`Response status code ${res.statusCode}`);
      });
      next();
    });

    app.use((err, _req, _res, _next) => {
      logger.error(`An error occured on processing request: ${err.message}`);
    });

    app.use((req, res) => {
      res.status(HttpCode.NOT_FOUND)
        .send(`Not found`);
      logger.error(`Route not found: ${req.url}`);
    });

    try {
      app.listen(port, (err) => {
        if (err) {
          return logger.error(`An error occured on server creation: ${err.message}`);
        }

        return logger.info(`Listening to connections on ${port}`);
      });
    } catch (err) {
      logger.error(`An error occured: ${err.message}`);
      process.exit(1);
    }
  },
};
