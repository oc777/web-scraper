'use strict'

const calendar = require('./lib/calendar')
const cinema = require('./lib/cinema')
const helper = require('./lib/helpers')

// Check that the url argument was provided
let url = process.argv.slice(2)

// If not - exit application
if (url.length === 0) {
  console.log('ERROR: No URL provided.')
  process.exit(0)
}

/*
// get urls of Calendar, Cinema, Dinner pages
helper.getUrls(url[0])
.then(res => calendar.html(res[0]))   // get friends' schedules
.then(cal => console.log(cal))        // cal [{ name:'Paul', days:['ok','OK','--']},...]
*/

helper.getUrls(url[0])
.then(res => cinema.movies(res[1]))   //
.then(cal => console.log(cal))        //
