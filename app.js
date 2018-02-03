'use strict'

const fetch = require('fetch').fetchUrl
const dom = require('jsdom')
const calendar = require('./lib/calendar')

// Check the arguments.
let url = process.argv.slice(2)

if (url.length === 0) {
  console.log('ERROR: No URL provided.')
  process.exit(0)
}

// calendar, cinema, dinner
let urls = []
const getUrls = url => {

}

const get = url => {
  return new Promise((resolve, reject) => {
    fetch(url, (error, meta, body) => {
      if (error) {
        return reject(error)
      }

      return resolve([meta, body])
    })
  })
}

get(url[0]).then(value => {
  console.log(value[0])
  console.log(value[1].toString())
})

// calendar.scrape(url[0])
