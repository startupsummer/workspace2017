import { getYear } from './getYear.js';

export function getWhyILove() {
  const rem = getYear() % 4;
  return ['JS is sexy', 'I was born under JS STAR', 'JS is creative', 'JS is not \'C\' '][rem];
}
