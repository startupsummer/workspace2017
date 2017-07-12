require("./index.scss");
require("./iLoveJs.scss");
require("./footer.scss");

var moment = require('moment');

import {getYearNow} from './getYear';
import {getWhyLove} from './getWhyILove';
import $ from "jquery";

let currentTimeStamp = getYearNow();
let phrase = getWhyLove(currentTimeStamp);

let date = new Date(currentTimeStamp);
var year = date.getFullYear();

$(".year").text(year);
$(".text--love").text(phrase);
