import moment from 'moment';

export default () => {
    
    switch (moment().format('ss') % 4) {
        case 1:
            return 'Because it\'s pretty';
        case 2:
            return 'Because it\'s wonderfull';
        default:
            return 'Because it\'s amazing';
    }
}