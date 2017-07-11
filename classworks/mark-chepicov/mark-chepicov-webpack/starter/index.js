require("./index.scss");
var $ = require('jquery');
var moment=require('moment');
var getYear = require('./getYear.js');
$(".footer__year").append(getYear());
var getWhyILove = require('./getWhyILove.js');
$(".main__text").append(getWhyILove());