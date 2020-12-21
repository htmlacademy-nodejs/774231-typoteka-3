'use strict';

const fs = require(`fs`).promises;

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const shuffle = (someArray) => {
  for (let i = someArray.length - 1; i > 0; i--) {
    const randomPosition = Math.floor(Math.random() * i);
    [someArray[i], someArray[randomPosition]] = [someArray[randomPosition], someArray[i]];
  }

  return someArray;
};

const readFileByPath = async (path, dataFormatter = (data) => data) => {
  return dataFormatter(await fs.readFile(path, `utf8`));
};

const dataFormatter = (data) => {
  return data.split(`\n`);
};

const getData = async (path) => {
  return await readFileByPath(path, dataFormatter);
};

const generateDateCreated = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  const currentMonth = date.getMonth();

  return new Date(currentYear, currentMonth, getRandomInt(1, 31)).toISOString().split(`T`).join(` `).split(`.`)[0];

};

module.exports = {
  getRandomInt,
  shuffle,
  getData,
  generateDateCreated,
};
