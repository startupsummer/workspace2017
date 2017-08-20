import moment from 'moment';

const getMinute = (() => moment().format('m'))();

function getPhrase(minute) {
  if (minute >= 0 && minute <= 20) {
    return 'Hello world!';
  } else if (minute > 21 && minute <= 40) {
    return 'Hello world world!';
  }
  return 'Hello world world world!';
}

export const currentPhrase = getPhrase(getMinute);

