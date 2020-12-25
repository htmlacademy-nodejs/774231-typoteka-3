'use strict';

const {DEFAULT_PORT, HttpCode, FILE_NAME} = require(`../constants`);
const express = require(`express`);
const chalk = require(`chalk`);
const fs = require(`fs`).promises;

module.exports = {
  name: `--server`,
  run(args) {
    const [customPort] = args;
    const port = Number.parseInt(customPort, 10) || DEFAULT_PORT;

    const app = express();
    const router = new express.Router();

    router.get(`/`, async (_, res) => {
      try {
        const fileContent = await fs.readFile(FILE_NAME);
        const mocks = JSON.parse(fileContent);
        res.json(mocks);
      } catch (err) {
        res.status(HttpCode.INTERNAL_SERVER_ERROR).send(err.message);
      }
    });

    app.use(`/posts`, router);

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
