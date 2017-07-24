import { getSeconds } from './getYear';

let phrase;

if (getSeconds() % 4 === 1) {
  phrase = 'Because JS is reale fashionable thing';
} else if (getSeconds() % 4 === 2) {
  phrase = 'Because JS is awesome';
} else {
  phrase = 'Because it is cool';
}

export default phrase;
