'use strict'

const fetch = require('fetch').fetchUrl

const scrape = url => {
  fetch(url, (error, meta, body) => {
    if (error) {
      return console.log('ERROR', error.message || error)
    }

    console.log('META INFO')
    console.log(meta)

    console.log('BODY')
    console.log(body.toString('utf-8'))
  })
}

module.exports.scrapeCalendar = scrape
