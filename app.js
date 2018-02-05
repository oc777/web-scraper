'use strict'

const calendar = require('./lib/calendar')
const cinema = require('./lib/cinema')
const dinner = require('./lib/dinner')
const helper = require('./lib/helpers')
const analyse = require('./lib/analyse')

console.log('App is up and running!')
// Check that the url argument was provided
let url = process.argv.slice(2)

// If not - exit application
if (url.length === 0) {
  console.log('ERROR: No URL provided with "npm start url".')
  process.exit(0)
}

(async() => {
  try {
    // get urls of Calendar, Cinema, Dinner pages
    process.stdout.write('Fetching links...   ')
    const urls = await helper.getUrls(url[0]).then(console.log('OK'))

    const calendarPromise = calendar.init(urls[0])
    const cinemaPromise = cinema.init(urls[1])
    const dinnerPromise = dinner.init(urls[2])

    const [days, films, food] = await Promise.all([
      calendarPromise,
      cinemaPromise,
      dinnerPromise
    ])

    analyse.init(days, films, food)
  } catch (error) {
    console.error('ERROR:', error)
  }
})()

/*
// calendar
.then(res => calendar.html(res[0]))   // get friends' schedules
.then(cal => console.log(cal))        // cal [{ name:'Paul', days:['ok','OK','--']},...]

// cinema
helper.getUrls(url[0])
.then(res => cinema.movies(res[1]))   //
.then(cal => console.log(cal))        //

// dinner
helper.getUrls(url[0])
.then(res => dinner.restaurant(res[2]))
// .then(rest => console.log(rest))
*/
