import moment from 'moment';

const getMinute = () => moment().format('m');

function getPhrase() {
  const minute = getMinute();
  if (minute >= 0 && minute <= 30) {
    return 'because Js loves you :)';
  }
  return "because it's simply awesome";
}

const phrase = getPhrase();
export default phrase;
