const getPhrase = (reason) => {
  let phrase = '';
  switch (reason) {
    case 1:
      phrase = 'Because it is the language of web';
      break;
    case 2:
      phrase = 'Because JS is used everywhere';
      break;
    case 3:
    default:
      phrase = 'Because it is wonderful and necessary language';
      break;
  }
  return phrase;
};

export default getPhrase;
