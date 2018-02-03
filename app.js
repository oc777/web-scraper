'use strict'

const jq = require('cheerio')
const client = require('./lib/client')

// Check that the url argument was provided
let url = process.argv.slice(2)

// If not - exit application
if (url.length === 0) {
  console.log('ERROR: No URL provided.')
  process.exit(0)
}

// calendar, cinema, dinner
let urls = []

/**
 * Gets the links to calendar, cinema and restaurant
 * and packs them into urls array
 *
 * @param {string} url
 */
const getUrls = url => {
  client.get(url).then(values => {
    const html = values[1].toString()
    const $ = jq.load(html)
    $('a').map(function () {
      urls.push($(this).attr('href'))
    })
    console.log(urls) // full
  })
}

getUrls(url[0])
console.log(urls) // empty
