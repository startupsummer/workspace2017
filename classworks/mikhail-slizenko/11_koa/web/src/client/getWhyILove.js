import moment from 'moment';

const getMin = () => moment().format('m');

const getReason = (min) => {
  if (min >= 0 && min <= 20) {
    return 'Reason 1';
  } else if (min > 20 && min <= 40) {
    return 'Reason 2';
  }
  return 'Reason 3';
};

export { getReason, getMin };
