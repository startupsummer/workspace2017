const moment = require('moment');

module.exports = () => {
  const ms = moment().get('millisecond');
  switch (ms % 4) {
    case 0: return 'JS is neploh';
    case 1: return 'JS van lav';
    case 2: return 'JS is izzi';
    case 3: return 'JS is not Assembler';
    default: return '';
  }
};
