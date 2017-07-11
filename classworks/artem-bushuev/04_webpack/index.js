var getYear = require("./js/getYear.js")
var  getWhyILove = require("./js/getWhyILove.js")

import "./index.scss";

console.log(getYear());
console.log(getWhyILove());

$('span.date').first().replaceWith(getYear());
$('p.why-i-love-js').first().replaceWith(getWhyILove());