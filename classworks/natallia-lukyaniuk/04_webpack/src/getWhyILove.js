import moment from 'moment';

const getWhyLove = () => {
  const remainder = moment().format('m') % 4;
  return remainder;
};

export default getWhyLove;
