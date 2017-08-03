import $ from 'jquery'

import '../styles/__index.sass'

import whyILoveJs from './getWhyILove.js'
import year from './getYear.js'

$('.whyILoveJs').html(whyILoveJs())
$('.year').html(year())
