const moment = require('moment');

export const getYear = function () {
  return moment().format('YYYY');
};
