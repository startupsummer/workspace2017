import moment from 'moment';

export const getYear = (() => moment().format('YYYY'))();
