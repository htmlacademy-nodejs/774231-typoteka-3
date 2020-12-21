'use strict';

const USER_ARGV_INDEX = 2;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;

const ExitCode = {
  SUCCESS: 0,
  EXIT: 1,
};

module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  FILE_NAME,
  DEFAULT_COMMAND,
  ExitCode,
};
