import moment from 'moment';

export default () => {
    let ms = moment().millisecond() % 3;
    let phrases = [
        'So ECMA!',
        'Such Script?',
        'WOW!!'
    ]
    console.log(ms);
    return phrases[ms];
};
