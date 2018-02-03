'use strict'

const jq = require('cheerio')
const client = require('./client')

const getUrls = async (url) => {
  const values = await client.get(url)
  const urls = []
  const $ = await jq.load(values[1].toString())

  $('a').map(function () {
    urls.push($(this).attr('href'))
  })
  return urls
}

module.exports.getUrls = getUrls