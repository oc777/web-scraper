'use strict'

const jq = require('cheerio')
const fetch = require('fetch').fetchUrl

// fetches meta info [0] and html [1] from given url
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

// post method
const post = (url, data) => {
  let options = {
    method: 'POST',
    disableRedirects: true,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    payload: data
  }

  return new Promise((resolve, reject) => {
    fetch(url, options, (error, meta, body) => {
      if (error) {
        return reject(error)
      }
      return resolve([meta, body])
    })
  })
}

// traverses dom and returns array with all links
const getUrls = async (url) => {
  const values = await get(url)
  const urls = []
  const $ = await jq.load(values[1].toString())

  $('a').map(function () {
    urls.push($(this).attr('href'))
  })
  return urls
}

module.exports.get = get
module.exports.post = post
module.exports.getUrls = getUrls
