'use strict'

const calendar = require('./lib/calendar')
const cinema = require('./lib/cinema')
const dinner = require('./lib/dinner')
const helper = require('./lib/helpers')
const analyse = require('./lib/analyse')

console.log('App is up and running! \n')
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
    process.stdout.write('Fetching links...                ')
    const urls = await helper.getUrls(url[0]).then(console.log('OK'))

    const calendarPromise = calendar.init(urls[0])
    const cinemaPromise = cinema.init(urls[1])
    const dinnerPromise = dinner.init(urls[2])

    const [days, films, food] = await Promise.all([
      calendarPromise,
      cinemaPromise,
      dinnerPromise
    ])

    await analyse.init(days, films, food).then(options => {
      console.log('--->   All done!')
      analyse.optionsToString(options)
    })
  } catch (error) {
    console.error('ERROR:', error)
  }
})()
