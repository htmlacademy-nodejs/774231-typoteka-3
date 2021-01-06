'use strict';

const fs = require(`fs`).promises;
const {FILE_NAME} = require(`../constants`);

let data = null;

const getFileData = async () => {
  if (data !== null) {
    return data;
  }

  try {
    const fileData = await fs.readFile(FILE_NAME, `utf-8`);
    data = JSON.parse(fileData);
  } catch (err) {
    console.log(`getFileData: `, err);
    Promise.reject(err);
  }

  return data;
};

module.exports = getFileData;
