'use strict';

const fs = require(`fs`).promises;
const chalk = require(`chalk`);
const path = require(`path`);
const {
  DEFAULT_COUNT,
  FILE_NAME,
  ExitCode} = require(`../constants`);
const {
  getRandomInt,
  getData,
  generateDateCreated,
  shuffle
} = require(`../utils`);

const generateOffers = async (count) => {
  const TITLES = await getData(path.join(`data`, `titles.txt`));
  const SENTENCES = await getData(path.join(`data`, `sentences.txt`));
  const CATEGORIES = await getData(path.join(`data`, `categories.txt`));

  return (
    Array(count).fill({}).map(() => ({
      category: shuffle(CATEGORIES).slice(0, 3),
      announce: shuffle(SENTENCES).slice(1, 5).join(` `),
      title: TITLES[getRandomInt(0, TITLES.length - 1)],
      fullText: shuffle(SENTENCES).slice(1, 7).join(` `),
      createdDate: generateDateCreated(),
    }))
  );
};

module.exports = {
  name: `--generate`,
  async run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      console.error(`Не больше 1000 объявлений.`);
      process.exit(ExitCode.EXIT);
    }

    try {
      const content = JSON.stringify(await generateOffers(countOffer));
      await fs.writeFile(FILE_NAME, content);
      console.info(chalk.green(`Operation success. File created.`));
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      console.error(chalk.red(`Can't write data to file...`));
      process.exit(ExitCode.EXIT);
    }
  }
};
