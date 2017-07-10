require("./index.scss");
var $ = require('jquery');
var moment=require('moment');
$(".footer__year").append(moment().format('YYYY'));