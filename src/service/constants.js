'use strict';

const USER_ARGV_INDEX = 2;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const DEFAULT_PORT = 3000;

const ExitCode = {
  SUCCESS: 0,
  EXIT: 1,
};

const HttpCode = {
  OK: 200,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
};


module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  HttpCode,
  DEFAULT_PORT,
  FILE_NAME,
  DEFAULT_COMMAND,
  ExitCode,
};
