'use strict';

const USER_ARGV_INDEX = 2;

const DEFAULT_COUNT = 1;
const FILE_NAME = `mocks.json`;
const DEFAULT_COMMAND = `--help`;
const DEFAULT_PORT = 3000;
const MAX_ID_LENGTH = 6;
const API_PREFIX = `/api`;

const ExitCode = {
  SUCCESS: 0,
  EXIT: 1,
};

const HttpCode = {
  OK: 200,
  CREATED: 201,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401,
  BAD_REQUEST: 400,
};


module.exports = {
  USER_ARGV_INDEX,
  DEFAULT_COUNT,
  HttpCode,
  DEFAULT_PORT,
  MAX_ID_LENGTH,
  FILE_NAME,
  DEFAULT_COMMAND,
  ExitCode,
  API_PREFIX,
};
