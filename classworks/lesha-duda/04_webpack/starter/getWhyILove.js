export const getWhyLove = (currentTimeStamp) => {
  let ans = currentTimeStamp % 4;

  if(ans == 0) {
    return "I love JS cause it's easy to try something new!";
  }
  else if(ans == 1) {
    return "I love JS cause it's modern and development everyday!";
  }
  else {
    return "I love JS cause it's nice weird)";
  }
}
