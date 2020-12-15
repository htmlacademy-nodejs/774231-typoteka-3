'use strict';

const fs = require(`fs`);
const {CATEGORIES,
  SENTENCES,
  TITLES,
  DEFAULT_COUNT,
  FILE_NAME,
  ExitCode} = require(`../constants`);
const {
  getRandomInt,
  generateDateCreated,
  shuffle
} = require(`../utils`);

const generateOffers = (count) => (
  Array(count).fill({}).map(() => ({
    category: shuffle(CATEGORIES).slice(0, 3),
    announce: shuffle(SENTENCES).slice(1, 5).join(` `),
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    fullText: shuffle(SENTENCES).slice(1, 7).join(` `),
    createdDate: generateDateCreated(),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countOffer = Number.parseInt(count, 10) || DEFAULT_COUNT;

    if (countOffer > 1000) {
      console.error(`Не больше 1000 объявлений.`);
      process.exit(ExitCode.EXIT);
    }

    const content = JSON.stringify(generateOffers(countOffer));

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        console.error(`Can't write data to file...`);
        process.exit(ExitCode.EXIT);
      }

      console.info(`Operation success. File created.`);
      console.log(`Задание готово!`);
      process.exit(ExitCode.SUCCESS);
    });
  }
};
