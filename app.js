'use strict'

const calendar = require('./lib/calendar')
const cinema = require('./lib/cinema')
const dinner = require('./lib/dinner')
const helper = require('./lib/helpers')

// Check that the url argument was provided
let url = process.argv.slice(2)

// If not - exit application
if (url.length === 0) {
  console.log('ERROR: No URL provided.')
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

    console.log('DAYS')
    console.log(days)

    console.log('FILMS')
    console.log(films)

    console.log('FOOD')
    console.log(food)
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
