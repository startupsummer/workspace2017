var moment = require('moment');
module.exports = () => {
     var ms = moment().get('millisecond');
     switch(ms % 4){
     case 0: return "JS is neploh";
     case 1: return "JS van lav";
     case 2: return "JS is izzi";
     case 3: return "cause ot nechego delat'";
    }
}
    