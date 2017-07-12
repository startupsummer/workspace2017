var moment = require('moment');
export const getWhyILove = function() {
  let phrases = ['it\'s cool','it\'s happy','it\'s nice', 'it\'s terrible'];
  switch (+moment(  ).format('mm')%4) {
    case 0:
      return phrases[0];
    case 1:
      return phrases[1];
    case 2:
      return phrases[2];
    case 3:
      return phrases[3];
  }
}
