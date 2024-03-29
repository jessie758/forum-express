const dayjs = require('dayjs');

const currentYear = () => dayjs().year();

const isEqual = (a, b) => a === b;

const isRootUser = (email) => email === 'root@example.com';

module.exports = {
  currentYear,
  isEqual,
  isRootUser,
};
