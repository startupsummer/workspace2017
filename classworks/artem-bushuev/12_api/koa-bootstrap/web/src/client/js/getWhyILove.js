const moment = require('moment');

module.exports = () => {
  switch (moment().get('millisecond') % 4) {
    case 1 : {
      return 'потому чть можно сделать web-странички «живыми»';
    }
    case 2: {
      return 'JavaScript может выполняться не только в браузере, а где угодно';
    }
    case 3: {
      return 'JavaScript – это «безопасный» язык программирования общего назначения.';
    }
        // "0"
    default : {
      return 'потому чть можно сделать web-странички «живыми»';
    }
  }
};
