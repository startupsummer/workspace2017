import moment from 'moment';

const getSeconds = () => moment().format('SS');
const cur_date = moment().format();

export { getSeconds, cur_date };
