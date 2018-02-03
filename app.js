'use strict'

const jq = require('cheerio')
const client = require('./lib/client')
const calendar = require('./lib/calendar')

// Check that the url argument was provided
let url = process.argv.slice(2)

// If not - exit application
if (url.length === 0) {
  console.log('ERROR: No URL provided.')
  process.exit(0)
}

/**
 * Gets the links to calendar, cinema and restaurant
 * and packs them into urls array
 *
 * @param {string} url
 * @returns {array} urls for calendar, cinema, dinner
 */
const getUrls = async (url) => {
  const values = await client.get(url)
  const urls = []
  const $ = await jq.load(values[1].toString())

  $('a').map(function () {
    urls.push($(this).attr('href'))
  })
  return urls
}

getUrls(url[0]).then(res => calendar.html(res[0]))
