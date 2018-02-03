'use strict'

const calendar = require('./lib/calendar')
const helper = require('./lib/helpers')

// Check that the url argument was provided
let url = process.argv.slice(2)

// If not - exit application
if (url.length === 0) {
  console.log('ERROR: No URL provided.')
  process.exit(0)
}

helper.getUrls(url[0]).then(res => calendar.html(res[0])).then(cal => console.log(cal))
