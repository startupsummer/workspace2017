import moment from 'moment';

export default () => {
    let remainder = Math.floor(moment().format('ss') % 4);
    switch (remainder) {
        case 1:
            return 'because it\'s cool!';
        case 2:
            return 'because it\'s super-duper!';
        default:
            return 'because it\'s great!';
    }
}