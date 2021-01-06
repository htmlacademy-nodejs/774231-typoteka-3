'use strict';

const {DEFAULT_PORT, HttpCode, API_PREFIX} = require(`../constants`);
const {appRouter} = require(`../api`);
const express = require(`express`);
const chalk = require(`chalk`);

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();

    app.use(API_PREFIX, appRouter);

    app.use((_, res) => res
       .status(HttpCode.NOT_FOUND)
       .send(`Not found`));

    app.listen(port, (err) => {
      if (err) {
        return console.error(`Ошибка при создании сервера`, err);
      }

      return console.info(chalk.green(`Ожидаю соединений на ${port}`));
    });
  },
};
